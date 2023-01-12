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
        case 'IMMUNE SUPPORT':
            return 'Immune Support';
        case 'BODY BUTTERS':
            return 'Body Butters';
        case 'BODY OILS + EXTRACTS':
            return 'Body Oils + Extracts';
        case 'BEESWAX':
            return 'Beeswax';
        case 'BULK':
            return 'Bulk';
        case 'FIRST AID':
            return 'First Aid';
        case 'PERFUMES':
            return 'Perfumes';
        case 'SOAP':
            return 'Soap';
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
        case 'Immune Support':
            return 'IMMUNE SUPPORT';
        case 'Body Butters':
            return 'BODY BUTTERS';
        case 'Body Oils + Extracts':
            return 'BODY OILS + EXTRACTS';
        case 'Beeswax':
            return 'BEESWAX';
        case 'Bulk':
            return 'BULK';
        case 'First Aid':
            return 'FIRST AID';
        case 'Perfumes':
            return 'PERFUMES';
        case 'Soap':
            return 'SOAP';
        default:
            return cat;
    }
}

module.exports = {trueCat, humanReadableCat};