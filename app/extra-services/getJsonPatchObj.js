export default function getJsonPatchObj(key, val) {
  return {
  
    path: key,
    op: "replace",
    value: val,
  };
}
