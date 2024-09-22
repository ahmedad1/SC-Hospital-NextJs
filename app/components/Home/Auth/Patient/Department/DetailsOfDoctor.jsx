"use client";

import LoadingComponent from "@/app/components/LoadingComponent";
import { BACKEND_BASEURL, days } from "@/app/extra-services/constants";
import useSendAuthRequest from "@/app/extra-services/useSendAuthRequest";
import { useEffect, useState } from "react";
import doctorImage from "@/app/public/doctor.webp";
import doctoressImage from "@/app/public/doctoress.webp";
import Swal from "sweetalert2";
import Image from "next/image";
import convertTimeTo12HoursBased from "@/app/extra-services/convertTimeTo12HoursBased";
import { Oval } from "react-loader-spinner";

export default function DetailsOfDoctor(props) {
  const sendReq = useSendAuthRequest();
  const [data, setData] = useState(null);
  const [day, setDay] = useState(null);
  const [date, setDate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dateObj = new Date();
  useEffect((_) => {
    sendReq(`/Account/Doctor/${props.id}`).then((res) => {
      if (!res.status) return;
      if (res.status === 200) {
        setData(res.data);
      } else {
        Swal.fire({ title: "Something went wrong", icon: "error" });
      }
    });
  }, []);
  if (data === null) return <LoadingComponent />;
  async function submitPaying(e) {
    if(isLoading)
      return
    if (!day) {
      Swal.fire({ title: "You didnt choose a day", icon: "error" });
      return;
    }
    if (!date) {
      Swal.fire({ title: "You didnt choose a date", icon: "error" });
      return;
    }
    setIsLoading(true)
    const result = await sendReq("/Account/init-pay", "post", {
      doctorId: props.id,
      description: `{'PatientId':0,Date:'${date}','DoctorId':${props.id}}`,
    });
    setIsLoading(false)
    if (result.status === 200) {
      window.open(result.data, "_blank");
      return;
    } else {
      Swal.fire({ title: "Something went wrong" });
    }
  }
  return (
    <div className="mt-5 container d-flex  flex-column align-items-center ">
      <h1 className="text-muted">Doctor Details</h1>
      <div className="form-control d-flex flex-wrap justify-content-lg-start justify-content-center mt-5 p-5">
        {data.profilePicture ? (
          <img
            className="rounded-circle"
            height={250}
            width={250}
            src={BACKEND_BASEURL + data.profilePicture}
            alt="reload the page"
            style={{ objectFit: "cover", boxShadow: "0 0 8px 0" }}
          />
        ) : (
          <Image
            height={250}
            width={250}
            src={data.gender === "Male" ? doctorImage : doctoressImage}
            alt="reload the page"
            style={{ objectFit: "cover" }}
          />
        )}
        <div
          className="d-flex flex-column align-items-center mt-lg-0 mt-4"
          style={{ width: "79%" }}
        >
          <h1
            className="text-primary"
            style={{ fontWeight: 200, letterSpacing: 2 }}
          >
            Dr. {data.firstName} {data.lastName}
          </h1>
          <hr />
          <p className="text-muted mt-3 text-center">{data.biography}</p>
          <p className="mt-2 text-success">
            Price of booking : {data.price} EGP
          </p>

          {day === null ? (
            <p className="mt-2 text-primary text-center">
              Available time will be shown based on the day you will choose
            </p>
          ) : (
            data.shifts?.map((e) => {
              if (e.day == day)
                return (
                  <p key={e.shiftId} className="mt-2 text-primary">
                    From {convertTimeTo12HoursBased(e.startTime)} to{" "}
                    {convertTimeTo12HoursBased(e.endTime)}
                  </p>
                );
            })
          )}
          <form>
            <div class="form-group mt-2">
              <div class="input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text">
                    Choose from available days
                  </span>
                </div>
                <select
                  onChange={(e) => {
                    if (
                      e.target.value === "Choose day" ||
                      e.target.value === ""
                    )
                      setDay(null);
                    else{ 
                      setDay(e.target.value);
                      setDate(`${dateObj.getFullYear()}-${(
                      dateObj.getMonth() + 1
                    )
                      .toString()
                      .padStart(2, "0")}-${(
                      dateObj.getDate() +
                      ((e.target.value - dateObj.getDay() + 7) % 7)
                    )
                      .toString()
                      .padStart(2, "0")}`)
                    }
                  }}
                  className="form-select"
                >
                  <option>Choose day</option>
                  {data?.shifts?.map((e) => {
                    return (
                      <option key={e.shiftId} value={e.day}>
                        {days[e.day]}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            {day && (
              <div class="form-group mt-3">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text">Choose The Date</span>
                  </div>
                  <input
                    type="date"
                    className="form-control "
                    step={7}
                    onChange={e=>setDate(e.target.value)}
                    defaultValue={`${dateObj.getFullYear()}-${(
                      dateObj.getMonth() + 1
                    )
                      .toString()
                      .padStart(2, "0")}-${(
                      dateObj.getDate() +
                      ((day - dateObj.getDay() + 7) % 7)
                    )
                      .toString()
                      .padStart(2, "0")}`}
                  />
                </div>
              </div>
            )}
          </form>
        </div>
        <p className="text-center mt-5 text-muted w-100">
          Note: Once you have booked a day, a message will be sent to your{" "}
          <mark>inbox email</mark> to inform you of your booking number
        </p>
        <button
          disabled={isLoading}
          onClick={async (e) => await submitPaying(e)}
          className="btn btn-outline-primary mt-5 form-control d-flex justify-content-center gap-1 align-items-center"
        >
          Book
          {isLoading && (
            <Oval
              visible={true}
              height="18"
              width="18"
              color="#0d6efd"
              ariaLabel="oval-loading"
              wrapperStyle={{}}
              wrapperClass="mt-1 ms-1"
            />
          )}
        </button>
      </div>
    </div>
  );
}
