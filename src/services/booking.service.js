import API from "../api";

const booking = {
    getBokingsByUser: (data, config={})=>{
        return API.get(`user/${data.email}/bookings?current=true`,config)
        .then(response =>{
            if (response?.data) {
              return response.data;
            }
            return response;
          });
    },
};

export default booking;