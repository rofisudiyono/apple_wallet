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
  const handleChangeText = (value: any) => {
    setName(value);
  };
  const handleSubmit = async () => {
    // Skip if the name is not set
    if (!Boolean(name)) return;
    try {
      setIsLoadingPass(true);
      const pass = await fetch(
        "https://inherently-fancy-goblin.ngrok-free.app",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
          }),
        }
      );
      const passBlob = await pass.blob();
      const responseAdd = await WalletManager.addPassFromUrl(
        await blobToDataUrl(passBlob)
      );
      console.log(">", responseAdd);

      setIsLoadingPass(false);
    } catch (e) {
      console.log(e);
    }
  };

  const getData = async () => {
    const pass = await fetch("https://inherently-fancy-goblin.ngrok-free.app", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    console.log(JSON.stringify(pass));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Enter your name below please</Text>
        {isLoadingPass && <ActivityIndicator />}
      </View>
      <TextInput
        editable={!isLoadingPass}
        value={name}
        onChangeText={handleChangeText}
        style={styles.input}
      />
      <Button
        disabled={isLoadingPass}
        title="Get your pass now!"
        onPress={handleSubmit}
      />
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
    fontSize: 16,
  },
  labelContainer: {
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
    height: 18,
  },
});
