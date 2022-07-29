const formatDate = (date) => {

    return `created ${new Date(date).getDate()} ${new Date(date).toLocaleString("en-US", {month: "long"})} ${new Date(date).getFullYear()}`
};

export default formatDate;