import {Text, TouchableOpacity} from "react-native"
import {useState, useEffect} from "react"
import { useRouter } from 'expo-router';
import * as DocumentPicker from 'expo-document-picker';


export default function Upload () {
    const router = useRouter();
    const [PDF, setPDF] = useState<DocumentPicker.DocumentPickerAsset | null>(null);
    const [id, setId] = useState<number | null> (null);
    const [uri, setUri] = useState <string|null>(null);

    useEffect(() => {
        async function upload() {
            const result = await DocumentPicker.getDocumentAsync({
                type: 'application/pdf',
            })
            if (result.canceled == false) {
                setPDF(result.assets[0])
                const formData = new FormData();
                formData.append("file", {
                    uri: result.assets[0].uri,
                    name: result.assets[0].name,
                    type:"application/pdf",
                    } as any)
                const response = await fetch ("http://localhost:8000/upload", {
                    method: "POST",
                    body: formData,
                })
                const data = await response.json()
                setId(data.document_id)
                setUri(result.assets[0].uri)

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
                params: { id: id, uri: uri }
            })}
            >
            <Text >View</Text>
        </TouchableOpacity>
        </>
        :null}
        </>
    )
}