import moment from "moment";

const secondsToMMSS = (seconds: number) => moment.utc(seconds *1000).format("mm:ss");
export default secondsToMMSS;