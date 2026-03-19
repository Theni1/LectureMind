import { View, useWindowDimensions } from "react-native";
import Sidebar from "../components/sidebar"
import Pdf from "react-native-pdf"
import { useLocalSearchParams } from 'expo-router';

export default function Workspace() {
  const {uri, id} = useLocalSearchParams<{ uri: string, id: string}>();
  const { width } = useWindowDimensions();

  const isTablet = width >= 768; // iPad breakpoint

  return (
    <View style={{ flex: 1, flexDirection: isTablet ? "row" : "column" }}>
      <View style={{ flex: 1 }}>
        <Pdf source = {{uri}} style = {{flex : 1}}/>
      </View>
      {isTablet && (
        <View style={{ width: 350 }}>
          <Sidebar documentId = {Number(id)}/>
        </View>
      )}
    </View>
  );
}