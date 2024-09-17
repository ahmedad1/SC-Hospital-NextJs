import UpdatePatient from '@/app/components/Home/Auth/Admin/UpdatePatient/UpdatePatient'


export default function page({params}) {
  return (
    <UpdatePatient id={params.patientId}/>
  )
}
