import Swal from "sweetalert2";


export default function isValidImage(profilePictureRef) {
    if(profilePictureRef.current.files.length!==0){
        if(!profilePictureRef.current.files[0].type.startsWith("image/"))
        {
            Swal.fire({title:"Wrong extention",icon:"error"})
            return false;
        }
        if(!profilePictureRef.current.files[0].size>1048576){
            Swal.fire({title:"Max size of image exceeded",icon:"error"})
            return false
        }
    
    }
    return true
}
