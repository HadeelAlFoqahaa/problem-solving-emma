function countForests(forests2dArr) {

    /*
    * Find only trees from 2d array
    * */
    let treesObjIndexes = {};
    forests2dArr.forEach((forestTreesArr, index1x1) => {
        forestTreesArr.forEach((el, index1x2) => {
            if (el) {
                treesObjIndexes[`[${index1x1}][${index1x2}]`] = [index1x1, index1x2];
            }
        });
    });

    /*
    * Loop through trees to see if should count them in one forest or more
    * */
    let forestCount = 0;
    let treesPeers = '';
    for (let tree in treesObjIndexes) {

        /* Check if this tree was a peer for counted tree as forest, so don't count it*/
        if (treesPeers.includes(tree))
            continue;

        let treeArrIndexes = treesObjIndexes[tree];

        handleEightSides(treeArrIndexes, treesObjIndexes, treesPeers, (err, shouldCountForest, currentTreePeers) => {
            treesPeers += currentTreePeers + ',';
            if (shouldCountForest) {
                forestCount++;
            }
        });
    }
    return forestCount;
}

function handleEightSides(treeArrIndexes, treesObjIndexes, treesPeers, cb) {

    let currentTreePeers = [];
    /*
    * Check three elements above & three elements bottom to the current tree & put its neighbours in the currentTreePeers array
    * */
    let shouldCounted = neighboursRecursion(1, currentTreePeers, treeArrIndexes, treesObjIndexes);

    /*
    * Check Previous & Next elements to the current tree and push them into currentTreePeers
    * */
    let prevElementKey = `[${treeArrIndexes[0]}][${treeArrIndexes[1] - 1}]`;
    if ((prevElementKey in treesObjIndexes)) {
        shouldCounted = true;
        currentTreePeers.push(prevElementKey);
    }

    let nextElementKey = `[${treeArrIndexes[0]}][${treeArrIndexes[1] + 1}]`;
    if ((nextElementKey in treesObjIndexes)) {
        shouldCounted = true;
        currentTreePeers.push(nextElementKey);
    }


    /* if one currentTreePeers is already in treesPeers so don't count this tree*/
    if (treesPeers.length) {
        for (let peer of currentTreePeers) {
            if (treesPeers.includes(peer)) {
                shouldCounted = false;
                break;
            }
        }
    }

    return cb(null, shouldCounted, currentTreePeers);
}

function neighboursRecursion(index, currentTreePeers, treeArrIndexes, treesObjIndexes, shouldCounted) {

    let prevArrKey = `[${treeArrIndexes[0] - 1}][${treeArrIndexes[1] + index}]`;
    if ((prevArrKey in treesObjIndexes)) {
        shouldCounted = true;
        currentTreePeers.push(prevArrKey);
    }

    let nextArrKey = `[${treeArrIndexes[0] + 1}][${treeArrIndexes[1] + index}]`;
    if ((nextArrKey in treesObjIndexes)) {
        shouldCounted = true;
        currentTreePeers.push(nextArrKey);
    }

    if (index === -1) {
        return shouldCounted;
    }

    return neighboursRecursion(index - 1, currentTreePeers, treeArrIndexes, treesObjIndexes, shouldCounted)
}

const testCase1 = [
    [0, 0, 1, 1, 0, 0],
    [0, 1, 1, 1, 0, 0],
    [0, 1, 0, 0, 0, 1],
    [0, 1, 0, 0, 1, 1],
    [1, 0, 0, 1, 1, 1],
];

const testCase2 = [
    [1, 1, 1, 0, 0, 0],
    [0, 1, 0, 1, 0, 0],
    [1, 0, 1, 0, 0, 0],
    [1, 1, 1, 1, 1, 1],
    [0, 1, 0, 1, 0, 1],
];

const testCase3 = [
    [0, 0, 0, 1, 1, 0],
    [1, 0, 1, 1, 0, 1],
    [0, 1, 0, 0, 1, 0],
    [1, 0, 1, 1, 0, 1],
    [1, 1, 1, 0, 1, 0],
];


console.log(`Count is: ${countForests(testCase1)}`);