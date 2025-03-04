
import React, { useState } from "react";
import { Upload, Camera } from "lucide-react";

interface ProfilePhotoUploadProps {
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  preview: string | null;
  label: string;
  isVehicle?: boolean;
}

/**
 * Composant pour télécharger une photo de profil ou de véhicule
 */
export const ProfilePhotoUpload: React.FC<ProfilePhotoUploadProps> = ({
  onImageChange,
  preview,
  label,
  isVehicle = false
}) => {
  const inputId = isVehicle ? "vehicle-pic" : "profile-pic";
  
  return (
    <div className="space-y-4">
      <label className="text-white/90 text-sm font-medium mb-2 block">
        {label}
      </label>
      <div className="flex flex-col items-center">
        <div className={`${isVehicle ? 'w-full h-40' : 'w-32 h-32'} rounded-${isVehicle ? 'xl' : 'full'} bg-white/10 border border-white/20 flex items-center justify-center mb-2 overflow-hidden`}>
          {preview ? (
            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <Camera className="text-white/50 w-12 h-12" />
          )}
        </div>
        <label htmlFor={inputId} className="px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white cursor-pointer hover:bg-white/20 transition-all flex items-center">
          <Upload className="mr-2 w-4 h-4" />
          {label}
          <input 
            type="file" 
            id={inputId} 
            className="hidden" 
            accept="image/*"
            onChange={onImageChange}
          />
        </label>
      </div>
    </div>
  );
};

export default ProfilePhotoUpload;
