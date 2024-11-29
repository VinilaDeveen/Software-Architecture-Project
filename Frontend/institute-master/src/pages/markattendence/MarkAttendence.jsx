import React, { useEffect, useState } from "react";
import RuleIcon from "@mui/icons-material/Rule";
import Sidebar from "../../component/sidebar/Sidebar";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function MarkAttendance() {
  const { isAuthenticated, jwtToken } = useAuth();
  const { cardId } = useParams();
  const [cardDetails, setCardDetails] = useState({
    cardId: "",
    id: "",
    studName: "",
    attendanceWeeks: [],
  });
  const navigate = useNavigate();
  const weeks = [1, 2, 3, 4, 5];

  const config = {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  };

  useEffect(() => {
    if (isAuthenticated && cardId) {
      loadAttendanceDetails();
    }
  }, [isAuthenticated, cardId]);

  async function loadAttendanceDetails() {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/monthlyFeeCards/${cardId}`,
        config
      );
      setCardDetails({
        cardId: response.data.cardId,
        id: response.data.student.id,
        studName: response.data.student.studName,
        attendanceWeeks: response.data.attendanceWeeks,
      });
    } catch (error) {
      console.error("Error fetching student details!", error);
    }
  }

  const handleCheckboxChange = (week) => {
    setCardDetails((prevDetails) => {
      const updatedAttendanceWeeks = prevDetails.attendanceWeeks.includes(week)
        ? prevDetails.attendanceWeeks.filter((w) => w !== week) 
        : [...prevDetails.attendanceWeeks, week]; 
      return { ...prevDetails, attendanceWeeks: updatedAttendanceWeeks };
    });
  };

  const saveAttendance = async () => {
    try {
      const updatedCard = {
        cardId: cardDetails.cardId,
        attendanceWeeks: cardDetails.attendanceWeeks,
      };

      await axios.put(`http://localhost:8080/api/v1/monthlyFeeCards/attendence/${cardId}`,updatedCard,config);
      alert("Attendance updated successfully!");
      navigate(`/studenttable`)
    } catch (error) {
      console.error("Error updating attendance!", error);
      alert("Failed to update attendance.");
    }
  };

  return (
    <div className="flex">
      <div>
        <Sidebar />
      </div>
      <div className="w-full">
        <div className="p-10 shadow-xl rounded-lg text-slate-600 m-10">
          <div className="flex flex-nowrap">
            <div>
              <span className="font-extrabold text-xl mx-5">Attendance Information</span>
            </div>
            <div className="px-10">
              <RuleIcon sx={{ fontSize: 100 }} />
            </div>
            <div className="info">
              <div>
                <span className="font-bold">Student ID: </span>
                <span>{cardDetails.id}</span>
              </div>
              <div>
                <span className="font-bold">Name: </span>
                <span>{cardDetails.studName}</span>
              </div>
              <div>
                <span className="font-bold">Attendance Weeks: </span>
                <span>
                  {cardDetails.attendanceWeeks?.length > 0
                    ? cardDetails.attendanceWeeks.join(", ")
                    : "No attendance marked yet."}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="p-20 shadow-xl rounded-lg text-slate-600 mx-10">
          <div className="title">
            <span className="font-extrabold text-xl">Update Information</span>
          </div>
          <div className="flex flex-wrap grid gap-4 grid-cols-2 mt-5">
            <div>
              <label className="flex">Name</label>
              <input
                type="text"
                name="studname"
                value={cardDetails.studName}
                readOnly
                className="border-b-2 border-slate-400 w-full pt-2 outline-none placeholder:text-slate-400"
              />
            </div>
            <div>
              <label className="flex">Mark Attendance</label>
              {weeks.map((week) => (
                <label className="flex gap-2 pt-2" key={week}>
                  <input
                    className="size-5"
                    type="checkbox"
                    value={week}
                    checked={cardDetails.attendanceWeeks?.includes(week) || false}
                    onChange={() => handleCheckboxChange(week)}
                  />
                  Week {week}
                </label>
              ))}
            </div>
            <div>
              <input
                type="button"
                value="Save"
                className="flex bg-slate-700 text-slate-50 mt-10 mb-5 px-20 py-2 rounded-xl hover:bg-slate-900 cursor-pointer"
                onClick={saveAttendance}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MarkAttendance;
