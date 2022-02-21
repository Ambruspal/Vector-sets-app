module.exports = (group) => {
    // Check for invalid group-quantity
    const valueList = Object.values(group);
    const isInvalidGroupQuantity = valueList.length <= 1;

    // Check for invalid group-names
    let isInvalidGroupName = false;
    const keyList = Object.keys(group);
    for (const key of keyList) {
        if (!/^group_[1-9][0-9]*$/.test(key)) {
            isInvalidGroupName = true;
            break;
        }
    }

    // Check for invalid values
    let firstVectorLength;
    let isInvalidValue = false;
    valueList.forEach((value, valueIndex) => {
        if (!Array.isArray(value) || value.length === 0)
            return (isInvalidValue = true);

        let isInvalidVector = false;
        value.forEach((vector, vectorIndex) => {
            if (!Array.isArray(vector) ||
                vector.length === 0 ||
                vector.some((el) => typeof el !== "number")
            ) {
                isInvalidVector = true;
            } else {
                if (valueIndex === 0 && vectorIndex === 0)
                    firstVectorLength = vector.length;
                if (vector.length !== firstVectorLength) isInvalidVector = true;
            }
        });
        if (isInvalidVector) isInvalidValue = true;
    });

    // Result
    return !isInvalidGroupName && !isInvalidValue && !isInvalidGroupQuantity ?
        true :
        false;
};