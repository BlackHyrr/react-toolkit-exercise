export const deepDiff = (object1, object2, path = "") => {
    let diff = [];

    Object.keys(object1 || {}).forEach((key) => {
        const newPath = path ? `${path}.${key}` : key;

        if (object2) {
            if (typeof object1[key] === 'object' && typeof object2[key] === 'object') {
                diff = [...diff, ...deepDiff(object1[key], object2[key], newPath)];
            } else if (object1[key] !== object2[key]) {
                diff.push({ path: newPath, oldValue: object1[key], newValue: object2[key] });
            }
        } else {
            diff.push({ path: newPath, oldValue: object1[key], newValue: null });
        }
    });

    Object.keys(object2 || {}).forEach((key) => {
        if (!object1 || !(key in object1)) {
            const newPath = path ? `${path}.${key}` : key;
            diff.push({ path: newPath, oldValue: null, newValue: object2[key] });
        }
    });

    return diff;
};