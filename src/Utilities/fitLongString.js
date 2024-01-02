export default function fitLongString  (longString,length) {

    if(longString?.length > length) {
        return `${longString?.slice(0,length)}...`
    }else {
        return longString
    }

}