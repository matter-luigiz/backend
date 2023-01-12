const humanReadableCat = cat => {
    switch (cat) {
        case 'RECYCLATE':
            return 'Recyclate';
        case 'COMPOUND':
            return 'Compound';
        case 'OFF-SPEC':
            return 'Off-Spec';
        case 'fashion-textiles':
            return 'Fashion and Textiles';
        case 'home_office_supply':
            return 'Home Office Supply';
        default:
            return cat;
    }
};

const trueCat = cat => {
    switch (cat) {
        case 'Recyclate':
            return 'RECYCLATE';
        case 'Compound':
            return 'COMPOUND';
        case 'Off-Spec':
            return 'OFF-SPEC';
        case 'Fashion and Textiles':
            return 'fashion-textiles';
        case 'Home Office Supply':
            return 'home_office_supply';
        default:
            return cat;
    }
}

module.exports = {trueCat, humanReadableCat};