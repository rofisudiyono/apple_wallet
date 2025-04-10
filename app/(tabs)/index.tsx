import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import WalletManager from "react-native-wallet-manager";

const blobToDataUrl = async (blob: any) =>
  new Promise((r) => {
    let a = new FileReader();
    a.onload = r;
    a.readAsDataURL(blob);
  }).then((e: any) => e.target.result);

export default function Index() {
  const [name, setName] = useState<string | undefined>(undefined);
  const [isLoadingPass, setIsLoadingPass] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  // const base_url = "https://inherently-fancy-goblin.ngrok-free.app";
  const base_url = "https://apple-pass.staging.jomcharge.com";
  // const base_url = "http://127.0.0.1:3000/";

  const handleSubmit = async () => {
    // Skip if the name is not set
    if (!Boolean(name)) return;
    try {
      setIsLoadingPass(true);
      const pass = await fetch(base_url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
        }),
      });
      console.log(JSON.stringify(pass));
      const passBlob = await pass.blob();
      await WalletManager.addPassFromUrl(await blobToDataUrl(passBlob));
      await WalletManager.viewInWallet("pass.com.evc.app");

      setIsLoadingPass(false);
    } catch (e) {
      setError(JSON.stringify(e));
      console.log(e);
    }
  };

  const getData = async () => {
    const pass = await fetch(base_url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
  };

  const showPass = async () => {
    await WalletManager.viewInWallet("pass.com.evc.app");
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{base_url}</Text>
        <Text style={styles.label}>{JSON.stringify(error)}</Text>
        {isLoadingPass && <ActivityIndicator />}
      </View>
      <TextInput value={name} onChangeText={setName} style={styles.input} />
      <Button title="Get your pass now!" onPress={handleSubmit} />
      <Button disabled={isLoadingPass} title="Show pass" onPress={showPass} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    width: "60%",
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  label: {
    fontSize: 8,
  },
  labelContainer: {},
});
