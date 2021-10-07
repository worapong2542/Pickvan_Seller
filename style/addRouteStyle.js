import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },

  baseText: {
    fontWeight: 'bold',
    color: '#5660B3',
    fontSize: 18,
    marginLeft: 20,
    marginRight:20,
    marginTop:15,
    marginBottom:15
  },

  box: {
    marginLeft: 20,
    marginRight:20,
    flexDirection: "row"
  },
  boxInput: {
    fontSize: 16,
    width: 300,
    color: '#5660B3',
    borderRadius: 4,
    
  },
  touch_able: {
    height: 50,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#E8F3F3",
    borderRadius: 4,
  },

  textInput: {
    height: 50,
    marginLeft: 20,
    marginRight:20,
    backgroundColor: "#E8F3F3",
    borderRadius: 4,
  },
  btnConfirm: {
    marginTop:60,
    margin: 20,
    backgroundColor: '#FEB5A6',
    borderRadius: 20,
    height: 40,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  dropdownsRow1: {
    width: "100%",
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
    paddingLeft: 10,
  },

  dropdownsRow: {
    //flexDirection: "row",
    width: "100%",
    paddingHorizontal: "5%",
    paddingTop: 25,
    paddingBottom: 10

  },
  dropdown1BtnStyle: {
    flex: 1,
    height: 50,
    backgroundColor: "#E8F3F3",
    borderRadius: 4,
    width: "100%",
  },
  dropdown1BtnTxtStyle:
  {
    color: "#5660B3",
    textAlign: "left"
  },

  dropdown1DropdownStyle:
    { backgroundColor: "#E8F3F3" },

  dropdown1RowStyle: {
    backgroundColor: "#EFEFEF",
  },
  dropdown1RowTxtStyle:
  {
    color: "#5660B3",
    textAlign: "left"
  },

  // -----------------------------------------------------------------------

  dropdown2BtnStyle: {
    flex: 1,
    height: 50,
    backgroundColor: "#E8F3F3",
    borderRadius: 3,
    width: "100%",
  },

  dropdown2BtnTxtStyle: {
    color: "#5660B3",
    textAlign: "left"
  },

  dropdown2DropdownStyle: {
    backgroundColor: "#EFEFEF"
  },

  dropdown2RowStyle: {
    backgroundColor: "#EFEFEF",
    borderBottomColor: "#C5C5C5",
  },

  dropdown2RowTxtStyle: {
    color: "#5660B3",
    textAlign: "left"
  },
  // --------------------------------------------------------------
  txtDefault:{
    color: "#5660B3",
    fontWeight:"bold",
    fontSize:16

  },
  timePicker:{
    height: 50,
    width: 155,
    backgroundColor: '#E8F3F3',
  },
});
export default styles;
