import React, { useState } from "react";
// ---- BACKEND: imported submitEnquiry from api service ----
import { submitEnquiry } from "@/api/enquiries";
import Modal from "@/components/ui/modal";

type User = {
  name: string;
  email: string;
  message: string;
};

type ErrorType = {
  name: string;
  email: string;
  message: string;
};

// ---- BACKEND ADDED: propertyId prop to link enquiry to property ----
interface AgentFormProps {
  propertyId: string;
}

const AgentForm = ({ propertyId }: AgentFormProps) => {
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    message: "",
  });
  const [error, setError] = useState<ErrorType>({
    name: "",
    email: "",
    message: "",
  });

  // ---- BACKEND ADDED: states for loading and feedback modal ----
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState<{
    show: boolean;
    type: "success" | "error";
    message: string;
  }>({ show: false, type: "success", message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    const inputFieldName = name as keyof User;
    setUser({ ...user, [inputFieldName]: value });
    setError({ ...error, [inputFieldName]: "" });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let hasError = false;
    const newError: ErrorType = {
      name: "",
      email: "",
      message: "",
    };

    if (!user.name.trim()) {
      newError.name = "Name is required";
      hasError = true;
    }

    if (!user.email.trim()) {
      newError.email = "Email is required";
      hasError = true;
    } else if (!user.email.includes("@")) {
      newError.email = "Email is invalid";
      hasError = true;
    }

    if (!user.message.trim()) {
      newError.message = "message is required";
      hasError = true;
    }

    if (hasError) {
      setError(newError);
      return;
    }

    try {
      setIsLoading(true);

      // ---- BACKEND CALL: submit enquiry to backend ----
      // ---- BACKEND REMOVED: console.log("Submiited", user) ----
      const result = await submitEnquiry({
        name: user.name,
        email: user.email,
        message: user.message,
        propertyId, // Sending the ID of the house
      });

      if (result.success) {
        setModal({
          show: true,
          type: "success",
          message: "Enquiry submitted! The agent will contact you soon.",
        });
         // ---- clear form on success ----
        setUser({ name: "", email: "", message: "" });
        setError({ name: "", email: "", message: "" });
      } else {
        setModal({
          show: true,
          type: "error",
          message: result.message || "Failed to submit enquiry",
        });
      }
    } catch (error) {
      setModal({
        show: true,
        type: "error",
        message: "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className='font-Manrope lg:w-[387px] w-full h-auto border border-[#918F8F] dark:border-gray-700 bg-white dark:bg-[#12201c] rounded-[10px] p-[20px] font-[Manrope]'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-[10px]'>
          <h1 className="font-bold text-[18px] text-[#023337] dark:text-gray-100">Contact Agent</h1>
          
          <label htmlFor="name" className='text-[#676565] dark:text-gray-300 font-bold'>Name</label>
          <input 
            type="text"
            placeholder='Enter your name'
            className={`border border-[#918F8F] dark:border-gray-600 bg-white dark:bg-[#0b1512] text-[#0A1916] dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-[#1A3C34] dark:focus:border-[#3b8a76] rounded-[10px] p-[10px] outline-none ${error.name ? "border-red-500" : "border-gray-300 dark:border-gray-600" }`}
            id="name" 
            name="name"
            value={user.name} 
            onChange={handleChange}
          />
          {error.name && <p className="text-red-500 text-[13px]">{error.name}</p>}

          <label htmlFor="email" className='text-[#676565] dark:text-gray-300 font-bold'>Email</label>
          <input 
            type="email"
            placeholder='Enter your email'
            className={`border border-[#918F8F] dark:border-gray-600 bg-white dark:bg-[#0b1512] text-[#0A1916] dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-[#1A3C34] dark:focus:border-[#3b8a76] rounded-[10px] p-[10px] outline-none ${error.email ? "border-red-500" : "border-gray-300 dark:border-gray-600" }`}
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
          {error.email && <p className="text-red-500 text-[13px]">{error.email}</p>}
          
          <label htmlFor="message" className='text-[#676565] dark:text-gray-300 font-bold'>Message</label>
          <textarea 
            name="message"
            id="message" 
            placeholder='Enter your message'
            rows={4}
            className={`border border-[#918F8F] dark:border-gray-600 bg-white dark:bg-[#0b1512] text-[#0A1916] dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-[#1A3C34] dark:focus:border-[#3b8a76] rounded-[10px] p-[10px] outline-none resize-none ${error.message ? "border-red-500" : "border-gray-300 dark:border-gray-600" }`}
            value={user.message}
            onChange={handleChange}
          />
          {error.message && <p className="text-red-500 text-[13px]">{error.message}</p>}

          <button 
            className='w-full h-[49px] bg-[#1A3C34] dark:bg-[#24574a] rounded-[10px] mt-[12px] text-white disabled:opacity-50' 
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>

      {/* ---- BACKEND ADDED: modal for success and error messages ---- */}
      {modal.show && (
        <Modal
          type={modal.type}
          message={modal.message}
          onClose={() => setModal({ ...modal, show: false })}
        />
      )}
    </>
  );
};

export default AgentForm;