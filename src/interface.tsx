export interface SubjectObjI {
  moduleQuantity: {
    value: number;
    setValue: React.Dispatch<React.SetStateAction<number>>;
  };
  moduleWeight: {
    value: string[];
    setValue: React.Dispatch<React.SetStateAction<string[]>>;
  };
  subjectName: {
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
  };
}
