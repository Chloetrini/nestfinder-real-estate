import { AdminContentSkeleton } from "@/components/skeletons/admin-skeletons";
import { useSeo } from "@/hooks/use-seo";
import React, { useState } from "react";
import { useDeleteEnquiry, useEnquiries, useUpdateEnquiryStatus } from "@/hooks/admin/use-admin";
import Modal from "@/components/ui/modal";

const Enquiries: React.FC = () => {
    useSeo({ title: 'Enquiries', noindex: true });
  const { data: enquiries = [], isLoading } = useEnquiries();
  const updateStatus = useUpdateEnquiryStatus();
  const removeEnquiry = useDeleteEnquiry();
  const [modal, setModal] = useState<{
    show: boolean;
    type: "success" | "error";
    message: string;
  }>({ show: false, type: "success", message: "" });

  const handleStatusUpdate = async (id: string, status: string) => {
    try {
      await updateStatus.mutateAsync({ id, status });
      setModal({ show: true, type: "success", message: "Status updated!" });
    } catch {
      setModal({ show: true, type: "error", message: "Failed to update status" });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await removeEnquiry.mutateAsync(id);
      setModal({ show: true, type: "success", message: "Enquiry deleted!" });
    } catch {
      setModal({ show: true, type: "error", message: "Failed to delete enquiry" });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "numeric", month: "short", year: "numeric"
    });
  };

  if (isLoading) {
    return <AdminContentSkeleton />;
  }

  return (
    <div className="flex flex-col bg-[#F3F4F6] dark:bg-gray-950 pb-24 lg:pb-10 min-h-screen">
      {/* NavBar */}
      <nav className="bg-white dark:bg-gray-900 px-4 lg:px-10 h-[76px] flex items-center border-b border-[#BAB9B9] dark:border-gray-600">
        <h1 className="font-['Lato'] font-bold text-[20px] lg:text-[22px] text-[#023337] dark:text-gray-100">Enquiries</h1>
      </nav>

      <div className="px-4 lg:px-10 py-6 lg:py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h2 className="font-bold text-[20px] lg:text-[22px] text-[#023337] dark:text-gray-100 font-['Lato']">Manage Enquiries</h2>
            <p className="text-[14px] text-[#000000] dark:text-gray-100 font-['Lato']">
              {enquiries.length} total enquiries
            </p>
          </div>
          {/* ---- stats ---- */}
          <div className="flex gap-4 w-full md:w-auto">
            <div className="flex-1 md:flex-none bg-white dark:bg-gray-900 px-4 py-2 rounded-lg border border-[#E5E7EB] dark:border-gray-700">
              <p className="text-[12px] text-[#75928B]">New</p>
              <p className="font-bold text-[#023337] dark:text-gray-100 text-[18px]">
                {enquiries.filter(e => e.status === "new").length}
              </p>
            </div>
            <div className="flex-1 md:flex-none bg-white dark:bg-gray-900 px-4 py-2 rounded-lg border border-[#E5E7EB] dark:border-gray-700">
              <p className="text-[12px] text-[#75928B]">Responded</p>
              <p className="font-bold text-[#023337] dark:text-gray-100 text-[18px]">
                {enquiries.filter(e => e.status === "responded").length}
              </p>
            </div>
          </div>
        </div>

        {/* Table/Card Container */}
        <div className="bg-white dark:bg-gray-900 rounded-[8px] overflow-hidden">
          {enquiries.length === 0 ? (
            <div className="py-20 text-center text-[#75928B]">
              <p>No enquiries yet.</p>
            </div>
          ) : (
            <>
              {/* DESKTOP TABLE: Hidden on mobile */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-[#B1FFED] dark:bg-[#0f3b32] h-[56px]">
                      <th className="text-[15px] font-medium text-[#023337] dark:text-gray-100 px-4 text-left">Name</th>
                      <th className="text-[15px] font-medium text-[#023337] dark:text-gray-100 px-4 text-left">Email</th>
                      <th className="text-[15px] font-medium text-[#023337] dark:text-gray-100 px-4 text-left">Property Name</th>
                      <th className="text-[15px] font-medium text-[#023337] dark:text-gray-100 px-4 text-left">Message</th>
                      <th className="text-[15px] font-medium text-[#023337] dark:text-gray-100 px-4 text-left">Date</th>
                      <th className="text-[15px] font-medium text-[#023337] dark:text-gray-100 px-4 text-left">Status</th>
                      <th className="text-[15px] font-medium text-[#023337] dark:text-gray-100 px-4 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {enquiries.map((enquiry) => (
                      <tr key={enquiry._id} className="h-[70px]">
                        <td className="px-4 py-4 font-bold text-[#0A1916] dark:text-gray-100 text-[14px]">{enquiry.name}</td>
                        <td className="px-4 py-4 text-[#403F3F] dark:text-gray-300 text-[14px]">
                          <a href={`mailto:${enquiry.email}`} className="text-[#1A3C34] dark:text-[#8fd3c0] hover:underline">{enquiry.email}</a>
                        </td>
                        <td className="px-4 py-4 text-[#403F3F] dark:text-gray-300 text-[14px] ">{enquiry.propertyName}</td>
                        <td className="px-4 py-4 text-[#403F3F] dark:text-gray-300 text-[14px] max-w-[200px]">
                          <p className="truncate hover:whitespace-normal hover:overflow-visible">{enquiry.message}</p>
                        </td>
                        <td className="px-4 py-4 text-[#403F3F] dark:text-gray-300 text-[14px]">{formatDate(enquiry.createdAt)}</td>
                        <td className="px-4 py-4">
                          <span className={`px-3 py-1 rounded-full text-[12px] font-medium ${
                            enquiry.status === "new" ? "bg-orange-100 text-orange-600" : "bg-green-100 dark:bg-green-900/40 text-green-600"
                          }`}>
                            {enquiry.status === "new" ? "New" : "Responded"}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-nowrap">
                          <div className="flex items-center gap-2">
                            <button onClick={() => handleStatusUpdate(enquiry._id, enquiry.status === "new" ? "responded" : "new")}
                              className={`${enquiry.status === "new" ? "text-[#1A3C34] dark:text-[#8fd3c0]" : "text-orange-500"} font-normal text-[14px] hover:underline`}>
                              {enquiry.status === "new" ? "Mark Responded" : "Mark New"}
                            </button>
                            <span className="text-[#21C45D]">/</span>
                            <button onClick={() => handleDelete(enquiry._id)}
                              className="text-[#FF0000] font-normal text-[14px] hover:underline">Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* MOBILE LIST: Visible on mobile, hidden on desktop */}
              <div className="lg:hidden flex flex-col divide-y divide-gray-100 dark:divide-gray-800">
                {enquiries.map((enquiry) => (
                  <div key={enquiry._id} className="p-4 flex flex-col gap-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-bold text-[#0A1916] dark:text-gray-100 text-[16px]">{enquiry.name}</p>
                        <p className="text-[12px] text-[#75928B]">{formatDate(enquiry.createdAt)}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-[11px] font-medium ${
                        enquiry.status === "new" ? "bg-orange-100 text-orange-600" : "bg-green-100 dark:bg-green-900/40 text-green-600"
                      }`}>
                        {enquiry.status === "new" ? "New" : "Responded"}
                      </span>
                    </div>
                    
                    <div>
                      <p className="text-[13px] font-medium text-[#1A3C34] dark:text-[#8fd3c0]">{enquiry.propertyName}</p>
                      <a href={`mailto:${enquiry.email}`} className="text-[13px] text-gray-500 dark:text-gray-400 underline">{enquiry.email}</a>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                      <p className="text-[14px] text-[#403F3F] dark:text-gray-300 italic leading-relaxed">"{enquiry.message}"</p>
                    </div>

                    <div className="flex items-center justify-end gap-4 pt-2">
                      <button 
                        onClick={() => handleStatusUpdate(enquiry._id, enquiry.status === "new" ? "responded" : "new")}
                        className={`text-[14px] font-medium ${enquiry.status === "new" ? "text-[#1A3C34] dark:text-[#8fd3c0]" : "text-orange-500"}`}
                      >
                        {enquiry.status === "new" ? "Mark Responded" : "Mark New"}
                      </button>
                      <button 
                        onClick={() => handleDelete(enquiry._id)}
                        className="text-[14px] font-medium text-[#FF0000]"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {modal.show && (
        <Modal
          type={modal.type}
          message={modal.message}
          onClose={() => setModal({ ...modal, show: false })}
        />
      )}
    </div>
  );
};

export default Enquiries;