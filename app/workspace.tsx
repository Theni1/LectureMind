import { View, useWindowDimensions } from "react-native";
import Sidebar from "../components/sidebar"

export default function Workspace() {
  const { width } = useWindowDimensions();

  const isTablet = width >= 768; // iPad breakpoint

  return (
    <View style={{ flex: 1, flexDirection: isTablet ? "row" : "column" }}>
      <View style={{ flex: 1 }}>
      </View>
      {isTablet && (
        <View style={{ width: 350 }}>
          <Sidebar/>
        </View>
      )}
    </View>
  );
}