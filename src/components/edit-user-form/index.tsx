'use client';

import { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { toast } from 'sonner';
import { InputTypes, Routes } from '@/constants/enums';
import useFormFields from '@/hooks/useFormFields';
import { Session } from 'next-auth';
import Image from 'next/image';
import { Button } from '../ui/button';
import { UserRole } from '@prisma/client';
import { useActionState, startTransition } from 'react';
import { updateProfile } from './_actions/profile';
import { Loader, Camera } from 'lucide-react';
import { Checkbox } from '@radix-ui/react-checkbox';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { ValidationError } from '@/app/validations/auth';
import FormFields from '../from-fields/from-fieds';
import { IFormField } from '@/app/types/app';
import { useSession } from 'next-auth/react';

// Type for form state management
interface FormState {
  message?: string;
  error?: ValidationError;
  status?: number | null;
  formData?: FormData;
}

// Persistence keys for localStorage
const STORAGE_KEYS = {
  FORM_DATA: 'profile_form_data',
  SELECTED_IMAGE: 'profile_selected_image',
  IS_ADMIN: 'profile_is_admin',
} as const;

// Utility to safely interact with localStorage
const storage = {
  set: <T>(key: string, value: T) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error saving to localStorage (${key}):`, error);
    }
  },
  get: <T>(key: string, defaultValue: T): T => {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : defaultValue;
    } catch (error) {
      console.error(`Error reading from localStorage (${key}):`, error);
      return defaultValue;
    }
  },
  remove: (key: string) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing from localStorage (${key}):`, error);
    }
  },
};

function EditUserForm({ user }: { user: Session['user'] }) {
  const { data: session, update } = useSession();
  const formRef = useRef<HTMLFormElement>(null);

  // Initialize state with persisted values
  const [selectedImage, setSelectedImage] = useState<string>(
    storage.get(STORAGE_KEYS.SELECTED_IMAGE, user.image ?? '')
  );
  const [isAdmin, setIsAdmin] = useState<boolean>(
    storage.get(STORAGE_KEYS.IS_ADMIN, user.role === UserRole.ADMIN)
  );
  const [lastToastMessage, setLastToastMessage] = useState<string | null>(null);

  // Initialize form data
  const formData = useMemo(() => {
    const persistedData = storage.get(STORAGE_KEYS.FORM_DATA, {});
    const data = new FormData();
    Object.entries({ ...user, ...persistedData }).forEach(([key, value]) => {
      if (value !== null && value !== undefined && key !== 'image') {
        data.append(key, value.toString());
      }
    });
    return data;
  }, [user]);

  const initialState: FormState = {
    message: '',
    error: {} as ValidationError,
    status: null,
    formData,
  };

  const [state, action, pending] = useActionState(updateProfile.bind(null, isAdmin), initialState);
  const { getFormFields } = useFormFields({ slug: Routes.PROFILE });

  // Persist state changes
  useEffect(() => {
    storage.set(STORAGE_KEYS.SELECTED_IMAGE, selectedImage);
  }, [selectedImage]);

  useEffect(() => {
    storage.set(STORAGE_KEYS.IS_ADMIN, isAdmin);
  }, [isAdmin]);

  useEffect(() => {
    const formObj = Object.fromEntries(state.formData?.entries() || []);
    storage.set(STORAGE_KEYS.FORM_DATA, formObj);
  }, [state.formData]);

  // Handle toast notifications and session updates
  useEffect(() => {
    if (state.message && typeof state.status === 'number' && !pending && state.message !== lastToastMessage) {
      toast.dismiss('profile-update-loading');
      const isSuccess = state.status === 200;
      toast[isSuccess ? 'success' : 'error'](state.message, {
        style: toastStyles[isSuccess ? 'success' : 'error'],
        duration: 4000,
        id: isSuccess ? 'profile-update-success' : 'profile-update-error',
        action: !isSuccess
          ? {
              label: 'Retry',
              onClick: () => formRef.current?.requestSubmit(),
            }
          : undefined,
      });
      setLastToastMessage(state.message);
      if (isSuccess) {
        // Clear persisted data on successful save
        storage.remove(STORAGE_KEYS.FORM_DATA);
        storage.remove(STORAGE_KEYS.SELECTED_IMAGE);
        storage.remove(STORAGE_KEYS.IS_ADMIN);
        if (session) {
          update({
            ...session,
            user: {
              ...session.user,
              role: isAdmin ? UserRole.ADMIN : UserRole.USER,
              image: selectedImage,
            },
          });
        }
      }
    }
  }, [pending, state.message, state.status, session, update, isAdmin, selectedImage, lastToastMessage]);

  // Sync selected image with user image
  useEffect(() => {
    if (user.image && user.image !== selectedImage) {
      setSelectedImage(user.image);
    }
  }, [user.image]);

  // Handle form submission
  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if ('Saving...' !== lastToastMessage) {
        toast.loading('Saving...', {
          id: 'profile-update-loading',
          style: toastStyles.loading,
        });
        setLastToastMessage('Saving...');
      }
      startTransition(() => {
        const formData = new FormData(e.currentTarget);
        action(formData);
      });
    },
    [action, lastToastMessage]
  );

  // Toast styles
  const toastStyles = {
    error: {
      color: '#ef4444',
      backgroundColor: 'hsl(var(--card)/0.95)',
      border: '1px solid hsl(var(--destructive)/0.5)',
      borderRadius: '8px',
      padding: '16px',
      fontSize: '14px',
      fontWeight: 500,
    },
    success: {
      color: '#10B981',
      backgroundColor: 'hsl(var(--card)/0.95)',
      border: '1px solid hsl(var(--secondary)/0.5)',
      borderRadius: '8px',
      padding: '16px',
      fontSize: '14px',
      fontWeight: 500,
    },
    loading: {
      borderRadius: '8px',
      padding: '16px',
      backgroundColor: 'hsl(var(--card)/0.95)',
      color: 'hsl(var(--foreground))',
      border: '1px solid hsl(var(--border)/0.5)',
      fontSize: '14px',
      fontWeight: 500,
    },
  };

  // Dynamic header text
  const profileHeader = user.name ? `Edit 's Profile` : 'Edit Your Profile';

  return (
    <div className="relative">
      {/* Particle Background */}
      <div className="particle-wave pointer-events-none absolute inset-0 z-0">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="particle animate-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 5 + 3}px`,
              height: `${Math.random() * 5 + 3}px`,
              animationDuration: `${Math.random() * 5 + 3}s`,
              animationDelay: `${Math.random() * 2}s`,
              animationTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
              '--x': `${Math.random() * 50 - 25}px`,
              '--y': `${Math.random() * 50 - 25}px`,
            }}
          />
        ))}
      </div>

      {/* Form */}
      <motion.form
        onSubmit={handleSubmit}
        ref={formRef}
        className={clsx(
          'relative z-10 flex flex-col md:flex-row gap-8 p-8',
          'glass-card',
          'transition-all duration-500 ease-in-out'
        )}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        aria-label="Edit profile form"
      >
        {/* User Image Section */}
        <motion.div
          className="group relative w-48 h-48 overflow-hidden rounded-full mx-auto border-2 border-primary/50"
          whileHover={{ scale: 1.05, rotate: 2 }}
          transition={{ duration: 0.3 }}
        >
          {selectedImage ? (
            <Image
              src={selectedImage}
              alt="User Avatar"
              width={192}
              height={192}
              className="rounded-full object-cover transition-transform duration-300 group-hover:scale-105"
              priority
            />
          ) : (
            <Image
              src="https://i.postimg.cc/kg2xytVs/610e8961bbb935274c005c6106a78a38.jpg"
              alt="Default Cat Avatar"
              width={192}
              height={192}
              className="rounded-full object-cover transition-transform duration-300 group-hover:scale-105"
              priority
            />
          )}
          <div
            className={clsx(
              'absolute inset-0 flex items-center justify-center rounded-full bg-black/50 transition-opacity duration-200',
              selectedImage ? 'group-hover:opacity-100 opacity-0' : 'opacity-100'
            )}
          >
            <UploadImage setSelectedImage={setSelectedImage} />
          </div>
        </motion.div>

        {/* Form Fields Section */}
        <motion.div
          className="flex-1 space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-heading font-bold text-gradient-primary mb-4">
            {profileHeader}
          </h2>
          {getFormFields().map((field: IFormField) => {
            const fieldValue = state?.formData?.get(field.name) ?? formData.get(field.name);
            return (
              <motion.div
                key={field.name}
                className="space-y-2"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <FormFields
                  {...field}
                  defaultValue={fieldValue as string}
                  error={state?.error?.[field.name]}
                  readOnly={field.type === InputTypes.EMAIL}
                  disabled={pending}
                />
              </motion.div>
            );
          })}

          {/* Admin Checkbox */}
          {session?.user.role === UserRole.ADMIN && (
            <motion.div
              className="flex items-center gap-3 my-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Checkbox
                id="admin"
                name="admin"
                checked={isAdmin}
                onCheckedChange={(checked) => setIsAdmin(checked as boolean)}
                className={clsx(
                  'w-5 h-5 border-2 rounded-md transition-all',
                  isAdmin ? 'bg-primary border-primary' : 'bg-card border-muted'
                )}
                aria-label="Admin Role"
              />
              <label
                htmlFor="admin"
                className="text-foreground font-medium cursor-pointer hover:text-primary transition-colors"
              >
                Admin Role
              </label>
            </motion.div>
          )}

          {/* Save Button */}
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Button
              type="submit"
              disabled={pending}
              className={clsx(
                'btn-primary w-full font-semibold rounded-lg py-2 px-4',
                pending && 'opacity-50 cursor-not-allowed flex items-center justify-center gap-2'
              )}
              aria-label="Save Profile"
            >
              {pending ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" aria-hidden="true" />
                  <span>Saving...</span>
                </>
              ) : (
                'Save Profile'
              )}
            </Button>
          </motion.div>
        </motion.div>
      </motion.form>
    </div>
  );
}

// Image Upload Component
function UploadImage({ setSelectedImage }: { setSelectedImage: React.Dispatch<React.SetStateAction<string>> }) {
  const handleImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error('Image size exceeds 5MB limit', {
          style: {
            color: '#ef4444',
            backgroundColor: 'hsl(var(--card)/0.95)',
            border: '1px solid hsl(var(--destructive)/0.5)',
            borderRadius: '8px',
            padding: '16px',
            fontSize: '14px',
            fontWeight: 500,
          },
        });
        return;
      }
      const url = URL.createObjectURL(file);
      setSelectedImage(url);
    }
  }, [setSelectedImage]);

  return (
    <>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        id="image-upload"
        onChange={handleImageChange}
        name="image"
        aria-label="Upload Profile Image"
      />
      <label
        htmlFor="image-upload"
        className="flex justify-center items-center w-full h-full cursor-pointer rounded-full hover:bg-primary/80 transition-all duration-200"
      >
        <Camera className="w-10 h-10 text-primary-foreground" aria-hidden="true" />
      </label>
    </>
  );
}

export default EditUserForm;