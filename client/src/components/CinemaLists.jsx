import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from './Loading';
import Modal from 'react-modal';

const CinemaLists = ({
  cinemas,
  selectedCinemaIndex,
  setSelectedCinemaIndex,
  fetchCinemas,
  auth,
  isFetchingCinemas = false,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const [isAdding, setIsAdding] = useState(false);
  const [locationModalOpen, setLocationModalOpen] = useState(false);

  // Adjust modal styles to match the new color scheme
  Modal.defaultStyles.overlay.backgroundColor = 'rgba(0, 0, 0, 0.75)';
  Modal.defaultStyles.content.border = '1px solid #DB2777'; // Indigo-red border
  // ...

  const openLocationModal = () => {
    setLocationModalOpen(true);
  };

  const closeLocationModal = () => {
    setLocationModalOpen(false);
  };

  const onAddCinema = async (data) => {
    try {
      setIsAdding(true);
      const response = await axios.post('/cinema', data, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      reset();
      fetchCinemas(data.name);
      toast.success('Cinema added successfully!');
    } catch (error) {
      toast.error('Error adding cinema.');
    } finally {
      setIsAdding(false);
      closeLocationModal();
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-red-500">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold text-white">Cinemas</h1>
        {auth.role === 'admin' && (
          <button
            onClick={openLocationModal}
            className="rounded-full bg-white p-3 shadow-lg hover:bg-gray-100 transition duration-300"
            aria-label="Add cinema"
          >
            <MagnifyingGlassIcon className="h-6 w-6 text-indigo-500" />
          </button>
        )}
      </div>
      <div className="mt-6 mb-8">
        <div className="relative">
          <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-white" />
          <input
            type="search"
            className="w-full pl-10 pr-4 py-2 rounded-lg text-gray-700 focus:outline-none focus:border-white focus:ring-1 focus:ring-white"
            placeholder="Search cinemas"
            {...register('search')}
          />
        </div>
      </div>
      {isFetchingCinemas ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cinemas.filter((cinema) => cinema.name.toLowerCase().includes(watch('search')?.toLowerCase() || '')).map((cinema, index) => (
            <div
              className={`p-4 transition-shadow border rounded-lg hover:shadow-lg ${
                selectedCinemaIndex === index ? 'border-pink-300' : 'border-white'
              } bg-white`}
              onClick={() => setSelectedCinemaIndex(index)}
              key={cinema._id}
            >
              <h3 className="text-lg font-bold text-gray-800">{cinema.name}</h3>
              <p className="text-sm text-gray-600">{cinema.location}</p>
            </div>
          ))}
        </div>
      )}
      {/* Modal and rest of the component */}
    </div>
  );
};

export default CinemaLists;
