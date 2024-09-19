import AddShift from '@/app/components/Home/Auth/Admin/ScheduleOfDoctor/AddShift/AddShift'
import checkDynamicRoute from '@/app/extra-services/checkDynamicRoute'


export default function page({params}) {
  checkDynamicRoute(params.id)

  return (
    <AddShift id={params.id}/>
  )
}
