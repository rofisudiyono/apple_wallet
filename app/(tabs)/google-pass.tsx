import React from "react";
import { Button, Linking, StyleSheet, Text, View } from "react-native";
import WalletManager from "react-native-wallet-manager";

const GooglePass = () => {
  const canAddPasses = async () => {
    try {
      const result = await WalletManager.canAddPasses();
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  };

  const addPassToGoogleWallet = async () => {
    try {
      await WalletManager.addPassToGoogleWallet(
        "https://pay.google.com/gp/v/save/eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjYwZGFiNDY0Zjg3MGVjNDljZDNlZjkzZGQ0YTZiMzFiNmZhOWE0NjMifQ.eyJpc3MiOiJnb29nbGUtd2FsbGV0QGpvbWNoYXJnZS00MzYxMDYuaWFtLmdzZXJ2aWNlYWNjb3VudC5jb20iLCJhdWQiOiJnb29nbGUiLCJvcmlnaW5zIjpbImh0dHBzOi8veW91cmZyb250ZW5kLmNvbSJdLCJ0eXAiOiJzYXZldG93YWxsZXQiLCJwYXlsb2FkIjp7ImxveWFsdHlPYmplY3RzIjpbeyJpZCI6IjMzODgwMDAwMDAwMjI5MDU3NTcudXNlcl9sb3lhbHR5X2lkXzAwMSIsImNsYXNzSWQiOiIzMzg4MDAwMDAwMDIyOTA1NzU3LmpvbWNoYXJnZV9tZW1iZXJzaGlwIiwic3RhdGUiOiJhY3RpdmUiLCJhY2NvdW50SWQiOiIxMjM0NTYiLCJhY2NvdW50TmFtZSI6IkpvaG4gRG9lIiwiYmFyY29kZSI6eyJ0eXBlIjoicXJDb2RlIiwidmFsdWUiOiIxMjM0NTY3ODkwIn0sImluZm9Nb2R1bGVEYXRhIjp7ImxhYmVsVmFsdWVSb3dzIjpbeyJjb2x1bW5zIjpbeyJsYWJlbCI6IlBvaW50cyIsInZhbHVlIjoiMTAwMCJ9XX1dfSwic21hcnRUYXBSZWRlbXB0aW9uVmFsdWUiOiJzbWFydC10YXAtaWQtMDAxIn1dfSwiaWF0IjoxNzQ0NDU5OTU3fQ.nJim5OVJxIPwvTPunyWkWWaIOZsOJhKTU9tLJ7-43ynDAOID1OQSGPh0VQW_Me3w0VeAW_cat9WgKeJr5j2NXBNHAhKaYrYAVVDQJ5f7Sz6mxpAMcO4zLKjrxpw1vKi2rJ7P6wKyZHoUqM--jx-Yca4yv6V2gvuEoxNw5CAFOOkcGtJU2ajqkBZtShslHIMgRpLKAGq9EvJ9tU3ZUnoHaL_Fiae4CleO6uMeZZDEFhpc3eHvNEv6XYlRIvghUy_BocNHUtd1ESlDqG96XcyvNLDy3TpC9sYLncTHnejhvdOTEnkSzn1TKjIVAAHEFf6n4O1ly589SRwBZx0wm83SHA"
      );
    } catch (e) {
      console.log(e.message);
    }
  };
  const openGoogleWalletPass = async () => {
    try {
      const response = await fetch(
        "http://0.0.0.0:3000/api/gwallet/loyalty-pass"
      );
      const { jwtUrl } = await response.json(); // format: https://pay.google.com/gp/v/save/<jwt>

      const canOpen = await Linking.canOpenURL(jwtUrl);
      if (canOpen) {
        await Linking.openURL(jwtUrl); // Akan membuka Google Wallet & prompt add to wallet
      } else {
        console.warn("Tidak bisa membuka Google Wallet");
      }
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <View style={styles.page}>
      <Text>GooglePass</Text>
      <Button title="Check if can add passes" onPress={canAddPasses} />
      <Button
        title="Add Pass to google wallet"
        onPress={addPassToGoogleWallet}
      />
    </View>
  );
};

export default GooglePass;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
});
