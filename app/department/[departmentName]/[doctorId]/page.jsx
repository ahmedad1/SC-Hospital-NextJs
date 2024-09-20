import DetailsOfDoctor from "@/app/components/Home/Auth/Patient/Department/DetailsOfDoctor";
import checkDynamicRoute from "@/app/extra-services/checkDynamicRoute";

export default function page({params}) {
    if(!/^(Dental|Opthalmology|Internal_Medicine|Orthopedic|Analysis|Neurology)/i.test(params.departmentName))
        redirect("/none-existant-page")
    checkDynamicRoute(params.doctorId)
  return (
    <DetailsOfDoctor id={params.doctorId}/>
  )
}
