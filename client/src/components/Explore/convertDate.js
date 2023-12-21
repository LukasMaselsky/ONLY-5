export default function convertDate(date) {
    var myDate = new Date(date);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return myDate.toLocaleDateString("en-GB", options);
}
