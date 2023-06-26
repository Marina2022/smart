import {createAsyncThunk, createSelector, createSlice} from '@reduxjs/toolkit'
import {api} from '../../index'
import {APIRoutes} from '../../consts'
import history from "../../browserHistory";

export const fetchExperts = createAsyncThunk('data/fetchExperts',
  async () => {
    const data = await api.post(APIRoutes.getAllExpert, {}, {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': '74803c46-6f65-4aac-90b1-44d147938011'
        }
      }
    );
    return data.data.data
  })

export const fetchOtherData = createAsyncThunk('data/fetchOtherData',
  async () => {
    const data = await api.post(APIRoutes.getOtherInfo, {}, {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': '74803c46-6f65-4aac-90b1-44d147938011'
        }
      }
    );
    console.log(data.data.info)
    return data.data.info;
  })

export const fetchOneExpert = createAsyncThunk('data/fetchOneExpert',
  async (id) => {
    const data = await api.post(APIRoutes.Experts, {expertId: id}, {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': '74803c46-6f65-4aac-90b1-44d147938011'
        }
      }
    );
    return data.data;
  })

export const sendExpert = createAsyncThunk('data/sendExpert',
  async ({sendData, file}) => {
    const data = await api.post(APIRoutes.sendExpert, sendData, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': '74803c46-6f65-4aac-90b1-44d147938011'
      }
    });

    if (file) {
      const formData1 = new FormData();
      formData1.append('file', file);
      formData1.append('expertId', sendData.expertId);

      const result = await api.post(APIRoutes.uploadImage, formData1, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-api-key': '74803c46-6f65-4aac-90b1-44d147938011'
        }
      });
    }
    return sendData.expertId;
  })

const initialState = {
  experts: [],
  isLoading: false,
  wallet: null,
  role: null,
  round: {},
  connectIsShown: false,
  walletType: null,
  formIsSubmitting: false,
  currentExpertId: null,
  currentExpert: null,
  isOneExpertLoading: false,
  donateInputValue: '',
  successfullyDonated: null,
  isUserRegistered: true,
  isOtherDataLoading: true,
  otherData: null,
  expertRequesteds: null,
  usersVerified: null
}

const dataReducer = createSlice({
  name: 'DATA',
  initialState,
  reducers: {
    setRoundData: (state, action) => {
      state.round = action.payload
    },
    setConnectIsShown: (state, action) => {
      state.connectIsShown = action.payload

      if (action.payload === false) {
        let isExpert = false
        state.experts.forEach((expert) => {
          if (state.wallet) {
            if (expert.address === state.wallet.number.toLowerCase()) {
              state.currentExpertId = expert.id
              state.role = 'expert'
              isExpert = true
            }
          }
        })
      }
    },

    setWalletType: (state, action) => {
      state.walletType = action.payload
    },

    setWallet: (state, action) => {
      state.wallet = action.payload
      state.experts.forEach((expert) => {
        if (expert.address === state.wallet.number.toLowerCase()) {
          state.currentExpertId = expert.id
          state.role = 'expert'
        } else {
          state.currentExpertId = null
          state.role = 'student'
        }
      })
    },

    setUserRole: (state, action) => {
      state.role = action.payload
    },
    setFormIsSubmitting: (state, action) => {
      state.formIsSubmitting = action.payload
    },
    setDonateInputValue: (state, action) => {
      state.donateInputValue = action.payload
    },

    setSuccessfullyDonated: (state, action) => {
      state.successfullyDonated = action.payload
      if (state.successfullyDonated) {
        state.successfullyDonated = state.successfullyDonated + action.payload
      } else {
        state.successfullyDonated = action.payload
      }
    },

    setIsUserRegistered: (state, action) => {
      state.isUserRegistered = action.payload
    },
  },

  extraReducers: (builder) => builder
    .addCase(fetchExperts.pending, (state, action) => {
      state.isLoading = true
    })
    .addCase(fetchExperts.fulfilled, (state, action) => {
      const experts = action.payload

      // авторизация для эксперта, который раньше уже регистрировался
      experts.forEach((expert) => {
        if (state.wallet) {
          if (expert.address === state.wallet.number.toLowerCase()) {
            state.currentExpertId = expert.id
            state.role = 'expert'
          }
        }
      })
      state.experts = experts
      state.isLoading = false

    })
    .addCase(fetchExperts.rejected, (state, action) => {
      console.log('experts fetching error')
      state.isLoading = false
    })

    .addCase(sendExpert.pending, (state, action) => {
      state.formIsSubmitting = true;
    })

    .addCase(sendExpert.fulfilled, (state, action) => {
      state.currentExpertId = action.payload
      state.formIsSubmitting = false
      history.push('/expertProfile/' + state.currentExpertId);
    })
    .addCase(sendExpert.rejected, (state, action) => {
      console.log('expert uploading error ')
      state.formIsSubmitting = false
    })
    .addCase(fetchOneExpert.pending, (state, action) => {
      state.isOneExpertLoading = true;
    })
    .addCase(fetchOneExpert.fulfilled, (state, action) => {
      state.currentExpert = action.payload
      state.isOneExpertLoading = false
    })
    .addCase(fetchOneExpert.rejected, (state, action) => {
      console.log('expert downloading error ')
      state.isOneExpertLoading = false
    })


    .addCase(fetchOtherData.pending, (state, action) => {
      state.isOtherDataLoading = true;
    })
    .addCase(fetchOtherData.fulfilled, (state, action) => {
      // console.log('action.payload', action.payload)
      state.otherData = action.payload
      state.usersVerified = action.payload.userRegistrations

      // if (action.payload.roundStarteds[0]) state.round = action.payload.roundStarteds[0]
      // console.log('round', action.payload.roundStarteds[0] )

      const startTime = new Date(+action.payload.roundStarteds[0]._startTime)
      const endTime = new Date(+action.payload.roundStarteds[0]._endTime)
      console.log('start time из API = ', startTime.toISOString())
      console.log('end time из API = ', endTime.toISOString())
      console.log('текущий таймстэмп = ', Date.now() )
// if (action.payload.roundStarteds[0]) state.round = action.payload.roundStarteds[0]
//       {
//         status: 1,
//           timeLeft: 202530,
//       }

      // Вот такой приходит раунд в АПИ
      // blockNumber: "37268913"
      // blockTimestamp:"1687719722"
      // id:"0xb68050713f977e5cf2d37f96bc1e8c1242ca0b767d525b59a3e463dad7bc578514000000"
      // _revardsAmount:"250000"

      // текущий таймстэмп =   1687779298401
      // _startTime:          "1687719920"
      // _endTime:            "1687723520"

      let status
      if (!action.payload.roundStarteds[0]) status = 0 // раунд не начался


      state.isOtherDataLoading = false

      const allExperts = action.payload.registrationRequesteds
      const approvedExperts = action.payload.registrationApproveds
      const notApprovedExperts =  allExperts.filter((expert)=> {
        return !approvedExperts.find(approvedExpert => approvedExpert._expertAddress === expert._expertAddress)
      })

      state.expertRequesteds =  notApprovedExperts

    })
    .addCase(fetchOtherData.rejected, (state, action) => {
      console.log('other data downloading error ')
      state.isOtherDataLoading = false
    })
})

export const {
  setRoundData,
  setConnectIsShown,
  setWalletType,
  setWallet,
  setUserRole,
  setDonateInputValue,
  setIsUserRegistered,
  setFormIsSubmitting
} = dataReducer.actions

export default dataReducer.reducer

export const selectExperts = (state) => state.DATA.experts
export const selectIsLoading = (state) => state.DATA.isLoading
export const selectRound = (state) => state.DATA.round
export const selectWallet = (state) => state.DATA.wallet
export const selectConnectIsShown = (state) => state.DATA.connectIsShown
export const selectWalletType = (state) => state.DATA.walletType
export const selectCurrentExpertId = (state) => state.DATA.currentExpertId
export const selectFormIsSubmitting = (state) => state.DATA.formIsSubmitting
export const selectCurrentExpert = (state) => state.DATA.currentExpert
export const selectIsOneExpertLoading = (state) => state.DATA.isOneExpertLoading
export const selectRole = (state) => state.DATA.role
export const selectDonateInputValue = (state) => state.DATA.donateInputValue
export const selectSuccessfullyDonated = (state) => state.DATA.successfullyDonated
export const selectIsUserRegistered = (state) => state.DATA.isUserRegistered


export const selectRegistrationRequested = (state) => state.DATA.expertRequesteds
export const selectRegisteredUsers = (state) => state.DATA.usersVerified
export const selectIsOtherDataLoading = (state) => state.DATA.isOtherDataLoading
