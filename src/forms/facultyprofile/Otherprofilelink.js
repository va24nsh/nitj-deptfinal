import axios from "axios";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { SERVER_URL } from "../../config/server";

function Otherprofilelink({ edit, data, token }) {
  const dept = useLocation().pathname.split("/")[2];
  const [newTitle, setNewTitle] = useState(
    data["personal_link"] &&
      Array.isArray(data["personal_link"]["Personal Link"]) &&
      data["personal_link"]["Personal Link"][0]?.title
      ? data["personal_link"]["Personal Link"][0].title
      : ""
  );
  const [newLink, setNewLink] = useState(
    data["personal_link"] &&
      Array.isArray(data["personal_link"]["Personal Link"]) &&
      data["personal_link"]["Personal Link"][0]?.link
      ? data["personal_link"]["Personal Link"][0].link
      : ""
  );
  const [googlelink, setGooglelink] = useState(
    data["personal_link"] ? data["personal_link"]["Google Scholar Link"] : ""
  );
  const handleSubmit = async (e) => {
    let newRow = {};
    const formdata = new FormData(e.target);
    for (let [key, value] of formdata.entries()) {
      if (key === "Personal Link") {
        newRow[key] = JSON.parse(value);
      } else {
        newRow[key] = value;
      }
    }
    try {
      await axios.put(
        `${SERVER_URL}/dept/${dept}/Faculty/${data._id}/${token}?q=personal_link`,
        newRow
      );
    } catch (error) {
      //console.log(error);
    }
  };
  return (
    <div className="overflow-x-auto">
      {edit ? (
        <div className="m-4">
          <form
            className="w-full max-w-lg shadow-md border rounded p-3"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-sm font-bold mb-2"
                  htmlhtmlFor="grid-password"
                >
                  Personal Link
                </label>
                <div className="w-full px-3">
                  <label className="block uppercase tracking-wide text-sm font-bold mb-2">
                    Personal Link Title
                  </label>
                  <textarea
                    type="text"
                    className="appearance-none bg-white py-2 px-3 mt-1 block border w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 focus:border-2 sm:text-sm"
                    onChange={(e) => setNewTitle(e.target.value)}
                    value={newTitle}
                    placeholder="Title"
                  />
                </div>
                <div className="w-full px-3">
                  <label className="block uppercase tracking-wide text-sm font-bold mb-2">
                    Personal Link URL
                  </label>
                  <textarea
                    type="text"
                    className="appearance-none bg-white py-2 px-3 mt-1 block border w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 focus:border-2 sm:text-sm"
                    onChange={(e) => setNewLink(e.target.value)}
                    value={newLink}
                    placeholder="Link"
                  />
                </div>
                <input
                  type="hidden"
                  name="Personal Link"
                  value={JSON.stringify([{ title: newTitle, link: newLink }])}
                />
              </div>
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-sm font-bold mb-2"
                  htmlhtmlFor="grid-password"
                >
                  Google Scholar Link
                </label>
                <textarea
                  type="text"
                  name="Google Scholar Link"
                  className="appearance-none bg-white py-2 px-3 mt-1 block border w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 focus:border-2 sm:text-sm"
                  onChange={(e) => setGooglelink(e.target.value)}
                  value={googlelink}
                ></textarea>
              </div>
            </div>
            <div className="flex px-3 w-full justify-end">
              <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 active:translate-y-[2px] hover:shadow-xl">
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md">
                  Submit
                </span>
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="overflow-x-auto relative my-2 scrollbar min-w-[570px]">
          <div className="flex max-w-full justify-between items-center p-4 shadow-md">
            <table className="text-sm sm:text-base">
              {Array.isArray(data["personal_link"]?.["Personal Link"]) &&
                data["personal_link"]["Personal Link"][0]?.title &&
                data["personal_link"]["Personal Link"][0]?.link && (
                  <tr>
                    <td className="font-bold pr-4 pl-2 py-2">Personal Link</td>
                    <td className="text-sm font-bold pr-4 pl-2 py-2">:</td>
                    <td>
                      <div className="text-orange-400 hover:underline">
                        <span
                          onClick={() => {
                            window.open(
                              data["personal_link"]["Personal Link"][0].link,
                              "_blank"
                            );
                          }}
                          style={{ cursor: "pointer" }}
                        >
                          {data["personal_link"]["Personal Link"][0].title}
                        </span>
                      </div>
                    </td>
                  </tr>
                )}

              {googlelink && (
                <tr>
                  <td className="font-bold pr-4 pl-2 py-2">
                    Google Scholar Link
                  </td>
                  <td className="text-sm font-bold pr-4 pl-2 py-2">:</td>
                  <td>
                    <div
                      onClick={() => {
                        window.open(googlelink, "_blank");
                      }}
                      className="text-orange-400 hover:underline"
                    >
                      {data["name"]}
                    </div>
                  </td>
                </tr>
              )}
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default Otherprofilelink;
