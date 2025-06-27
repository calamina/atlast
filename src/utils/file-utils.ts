import { useNotificationStore } from "@/stores/notification";
import strings from "./strings";

export const useFileUtils = () => {
  const { addErrorNotification } = useNotificationStore();

  const downloadBlob = async (blob: Blob, filename: string): Promise<void> => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    return Promise.resolve()
  };

  const createBlob = (file: File, type = 'application/json'): Blob => {
    return new Blob([file], { type })
  }

  const checkJsonFile = (file: File | undefined): Promise<File> => {
    if (!file) {
      return Promise.reject(addErrorNotification('Please select a file to import' + strings.SAD));
    }
    if (file.size === 0) {
      return Promise.reject(addErrorNotification('The file is empty' + strings.SAD));
    }
    if (file.type !== 'application/json') {
      return Promise.reject(addErrorNotification('Please select a valid JSON file' + strings.SAD));
    }
    return Promise.resolve(file);
  }

  return {
    downloadBlob,
    createBlob,
    checkJsonFile
  };
}