import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },

  baseText: {
    fontWeight: 'bold',
    color: 'rgba(86, 96, 179, 1)',
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
    color: 'rgba(86, 96, 179, 1)',
    //backgroundColor: "rgba(230, 234, 249, 1)",
    borderRadius: 4,
    
  },
  touch_able: {
    height: 50,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "rgba(230, 234, 249, 1)",
    borderRadius: 4,
  },

  textInput: {
    height: 50,
    marginLeft: 20,
    marginRight:20,
    backgroundColor: "rgba(230, 234, 249, 1)",
    borderRadius: 4,
  },
  btnConfirm: {
    marginTop:60,
    margin: 20,
    backgroundColor: 'rgba(86, 96, 179, 1)',
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
    backgroundColor: "rgba(230, 234, 249, 1)",
    borderRadius: 4,
    width: "100%",
  },
  dropdown1BtnTxtStyle:
  {
    color: "rgba(86, 96, 179, 1)",
    textAlign: "left"
  },

  dropdown1DropdownStyle:
    { backgroundColor: "#EFEFEF" },

  dropdown1RowStyle: {
    backgroundColor: "#EFEFEF",
  },
  dropdown1RowTxtStyle:
  {
    color: "'rgba(86, 96, 179, 1)'",
    textAlign: "left"
  },

  // -----------------------------------------------------------------------

  dropdown2BtnStyle: {
    flex: 1,
    height: 50,
    backgroundColor: "rgba(230, 234, 249, 1)",
    borderRadius: 3,
    width: "100%",
  },

  dropdown2BtnTxtStyle: {
    color: "'rgba(86, 96, 179, 1)'",
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
    color: "'rgba(86, 96, 179, 1)'",
    textAlign: "left"
  },
});
export default styles;
