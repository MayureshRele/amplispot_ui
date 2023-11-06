import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";
import "./App.css";
import testImg from "./assets/pic.jpeg";
type FormData = {
  first_Name: string;
  last_Name: string;
  profile_pic: File;
};
function App() {
  const [formDetails, setFormDetails] = useState<FormData>({} as FormData);
  const [file, setFile] = useState<string>("");
  const [uploadedFile, setUploadedFile] = useState<string>("");
  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = event.target;
    if (files) {
      setFile(URL.createObjectURL(files[0]));
      setFormDetails({
        ...formDetails,
        [name]: files[0],
      });
      return;
    }
    setFormDetails({
      ...formDetails,
      [name]: value,
    });
  };
  const handleForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formDetails) {
      try {
        const formData = new FormData();
        formData.append("first_Name", formDetails.first_Name);
        formData.append("last_Name", formDetails.last_Name);
        formData.append("profile_pic", formDetails.profile_pic);

        const response = await fetch(
          `${import.meta.env.VITE_API_URI}/create-image`,
          {
            method: "POST",
            body: formData,
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const { file } = await response.json();
        setUploadedFile(file);
        toast.success("Data Added Succesfully");
      } catch (error) {
        toast.error(error ?? "Data Added Failed");
      }
    }
  };
  return (
    <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
      <div className="container max-w-screen-lg mx-auto">
        <div>
          <h2 className="font-semibold text-xl text-gray-600">Fill out form</h2>
          <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6 mt-2">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <form onSubmit={handleForm}>
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                    <div className="md:col-span-5">
                      <label htmlFor="first_Name">Full Name</label>
                      <input
                        onChange={handleInput}
                        type="text"
                        name="first_Name"
                        id="first_Name"
                        required
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={formDetails.first_Name}
                      />
                    </div>
                    <div className="md:col-span-5">
                      <label htmlFor="last_Name">Last Name</label>
                      <input
                        onChange={handleInput}
                        type="text"
                        name="last_Name"
                        id="last_Name"
                        required
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={formDetails.last_Name}
                      />
                    </div>
                    <div className="md:col-span-5">
                      <label htmlFor="profile_pic">Profile Picture</label>
                      <input
                        onChange={handleInput}
                        type="file"
                        name="profile_pic"
                        id="profile_pic"
                        required
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      />
                    </div>
                    <div className="md:col-span-5">
                      <div className="inline-flex items-end">
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                          type="submit"
                        >
                          Submit
                        </button>
                      </div>
                      {uploadedFile && (
                        <div className="inline-flex items-end mx-5">
                          <a
                            href={uploadedFile}
                            target="_blank"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            type="submit"
                          >
                            Preview
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </form>
              </div>
              {formDetails && formDetails.profile_pic && (
                <div className="lg:col-span-1">
                  <img src={file} alt="profile_pic" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
