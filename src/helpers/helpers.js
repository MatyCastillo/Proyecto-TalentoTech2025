export const capitalizeFirst = (string)=>{
 if (typeof string !== 'string' || string.length === 0) {
    return string; // Handle non-string or empty inputs
  }
  return string.replace(/^./, (match) => match.toUpperCase());
}