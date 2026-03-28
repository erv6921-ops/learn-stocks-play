import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  fallback?: string;
  label?: string;
  className?: string;
}

export default function BackButton({ fallback = "/dashboard", label, className }: BackButtonProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate(fallback);
    }
  };

  return (
    <Button
      variant="ghost"
      size={label ? "sm" : "icon"}
      onClick={handleBack}
      className={className}
    >
      <ArrowLeft className="w-4 h-4" />
      {label && <span className="ml-1">{label}</span>}
    </Button>
  );
}
