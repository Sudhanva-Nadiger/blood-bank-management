import moment from 'moment';

export const getLoggedInUsername = (user) => {
    if(!user) return null
    if(user.userType === 'donar') {
        return user.name
    } else if(user.userType === 'hospital') {
        return user.hospitalName
    }else if (user.userType === 'organization') {
        return user.organizationName
    }
}

export const getAntdInputValidation = () => {
    return [{
        required: true,
        message: 'This field is required',
    }]
}

export const getDateFormat = (date) => {
    return moment(date).format('DD MMM YYYY hh:mm A');
}