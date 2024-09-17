
import { Oval } from 'react-loader-spinner'

export default function LoadingComponent() {
  return (
    <>
        <h1 className="d-flex justify-content-center mt-5 vh-100">
          Loading&nbsp;
          <Oval
            visible={true}
            height="50"
            width="50"
            color="#0d6efd"
            ariaLabel="oval-loading"
            wrapperStyle={{}}
            wrapperclassName="mt-2 ms-1"
          />
        </h1>
      </>
  )
}
