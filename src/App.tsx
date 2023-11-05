import { ChangeEvent, FormEvent, useState } from "react";
import "./App.css";
import testImg from "./assets/pic.jpeg";
type FormData = {
  full_name: string;
  last_name: string;
  profile_pic: File;
};
function App() {
  const [formDetails, setFormDetails] = useState<FormData>({} as FormData);
  const [file, setFile] = useState<string>("");
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
  const handleForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formDetails) {
      console.log(formDetails);
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
                      <label htmlFor="full_name">Full Name</label>
                      <input
                        onChange={handleInput}
                        type="text"
                        name="full_name"
                        id="full_name"
                        required
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={formDetails.full_name}
                      />
                    </div>
                    <div className="md:col-span-5">
                      <label htmlFor="last_name">Last Name</label>
                      <input
                        onChange={handleInput}
                        type="text"
                        name="last_name"
                        id="last_name"
                        required
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={formDetails.last_name}
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
            {/* {formDetails && (
              <div className="border-2 rounded-sm shadow-sm m-3 p-2">
                <div className="profilePic relative">
                  <img
                    src={file}
                    alt="profilePic"
                    className=" w-[135px] h-[135px] top-[41px] left-[291px] absolute rounded-2xl"
                  />
                </div>

                <img src={testImg} alt="testImg" className="" />
                <div className="relative">
                  <div className="absolute bottom-[35px] left-[386px] text-2xl capitalize font-semibold">
                    {formDetails && formDetails.full_name}{" "}
                    {formDetails && formDetails.last_name}
                  </div>
                </div>
              </div>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
