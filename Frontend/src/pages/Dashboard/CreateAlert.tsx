import { useContext, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LocationContext, useLocation } from "@/context/LocationContext";

interface AlertFormData {
  name: string;
  phone: string;
  city: string;
  disasterType: string;
  severity: "low" | "medium" | "high" | "critical";
  description: string;
  image?: File | null;
}

export default function AlertForm(){
  const [formData, setFormData] = useState<AlertFormData>({
    name: "",
    phone: "",
    city: "",
    disasterType: "",
    severity: "medium",
    description: "",
    image: null,
  });
  const { location, fetchUserLocation } = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      image: e.target.files?.[0] || null,
    }));
  };

  const handleSelectChange = (name: keyof AlertFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validatePhone = (phone: string) => {
    return /^\+?[0-9]{10,15}$/.test(phone);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.city || !formData.description) {
      alert("Please fill out all required fields.");
      return;
    }

    if (!validatePhone(formData.phone)) {
      alert("Invalid phone number. Include country code if applicable.");
      return;
    }

    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) payload.append(key, value as string);
    });

    try {
      setIsSubmitting(true);
      const res = await fetch("/api/alerts", {
        method: "POST",
        body: payload,
      });

      if (!res.ok) throw new Error("Server error");

      alert("Alert submitted. Authorities will review your report.");
      setFormData({
        name: "",
        phone: "",
        city: "",
        disasterType: "",
        severity: "medium",
        description: "",
        image: null,
      });
    } catch (error) {
      alert("Submission failed. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl w-full mx-auto mt-10 border shadow-lg rounded-2xl p-8 space-y-6"
    >
      <h2 className="text-2xl md:text-3xl font-bold text-center">
        Emergency Disaster Alert Form
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name *</Label>
          <Input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+1234567890"
            required
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="city">City / District *</Label>
          <Input
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Mumbai, Pune, etc."
            required
          />
        </div>
      </div>

        <div className="space-y-2">
          <Label>Type of Disaster *</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {["flood", "earthquake", "fire", "landslide", "other"].map((type) => (
              <label key={type} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="disasterType"
                  value={type}
                  checked={formData.disasterType === type}
                  onChange={() => handleSelectChange("disasterType", type)}
                  className="accent-red-600"
                />
                <span className="capitalize">{type}</span>
              </label>
            ))}
          </div>
        </div>


        <div className="space-y-2">
          <Label>Severity *</Label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {["low", "medium", "high", "critical"].map((level) => (
              <label key={level} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="severity"
                  value={level}
                  checked={formData.severity === level}
                  onChange={() =>
                    handleSelectChange("severity", level as AlertFormData["severity"])
                  }
                  className="accent-red-600"
                />
                <span className="capitalize">{level}</span>
              </label>
            ))}
          </div>
        </div>


        <div className="space-y-2">
          <Label>Location Access</Label>
          <div className="flex items-center gap-4">
            <div
              className={`px-4 py-2 rounded-full font-semibold cursor-pointer ${
                location ? "bg-green-600" : "bg-gray-400"
              }`}
              onClick={async () => {
                if (!navigator.geolocation || !navigator.permissions) {
                  alert("Geolocation is not supported by your browser.");
                  return;
                }

                if (!location) {
                  fetchUserLocation();
                }


                 const permissionStatus = await navigator.permissions.query({ name: 'geolocation' });

                if (permissionStatus.state === 'denied') {
                  alert("Location permission was denied. Please enable it in your browser settings and reload the page.");
                  return;
                }
              }}

            >
              {location ? "ON" : "OFF"}
            </div>
            {!location && (
              <span className="">
                Click to enable location for accurate alert tagging.
              </span>
            )}
          </div>
        </div>


      <div className="space-y-2">
        <Label htmlFor="description">Detailed Description *</Label>
        <Textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={6}
          placeholder="Describe what’s happening in your area..."
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">Optional Evidence (Photo or Video)</Label>
        <Input
          type="file"
          accept="image/*,video/*"
          onChange={handleFileChange}
          className="cursor-pointer"
        />
        <p className="text-sm mt-1">
          Max 5MB. Supported: JPG, PNG, MP4.
        </p>
      </div>

      <div className="pt-4">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-red-600 hover:bg-red-700 py-4 text-base font-semibold"
        >
          {isSubmitting ? "Submitting Alert..." : "Submit Emergency Alert"}
        </Button>
      </div>

      <p className="text-center text-sm">
        Fields marked with * are required. Misuse of this form may lead to legal action.
      </p>
    </form>
  );
}
