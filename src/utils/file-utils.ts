import { useNotificationStore } from "@/stores/notification";
import strings from "./strings";

export const useFileUtils = () => {
  const { addErrorNotification } = useNotificationStore();

  const downloadBlob = (blob: Blob, filename: string): void => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const createBlob = (file: any, type = 'application/json'): Blob => {
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