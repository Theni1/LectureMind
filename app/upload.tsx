import {Text, TouchableOpacity} from "react-native"
import {useState, useEffect} from "react"
import { useRouter } from 'expo-router';
import * as DocumentPicker from 'expo-document-picker';


export default function Upload () {
    const router = useRouter();
    const [PDF, setPDF] = useState<DocumentPicker.DocumentPickerAsset | null>(null);
    useEffect(() => {
        async function upload() {
            const result = await DocumentPicker.getDocumentAsync({
                type: '*/*', // or 'application/pdf'
            })
            if (result.canceled == false) {
                setPDF(result.assets[0])
            }
        }
        upload();
    }, []);
    return (
        <>
        {PDF ? 
        <>
        <Text>File has been sucessfully uploaded</Text>
        <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => 
            router.push({
                pathname: "/workspace",
                params: { uri: PDF.uri }
            })}
            >
            <Text >View</Text>
        </TouchableOpacity>
        </>
        :null}
        </>
    )
}