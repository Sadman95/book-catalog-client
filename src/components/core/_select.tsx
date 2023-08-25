import { FC } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface IProps {
  data: Array<any>;
  onValueChange: (value: any) => void;
  placeHolder?: string;
}

const CoreSelect: FC<IProps> = ({
  data,
  onValueChange,
  placeHolder = '',
}: IProps) => {
  return (
    <Select onValueChange={onValueChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeHolder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup className="max-h-96 overflow-y-auto">
          {data?.map((value: string, i: number) => (
            <SelectItem key={i} value={value}>
              {value}
            </SelectItem>
          ))}
          {/* <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="blueberry">Blueberry</SelectItem>
        <SelectItem value="grapes">Grapes</SelectItem>
        <SelectItem value="pineapple">Pineapple</SelectItem> */}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default CoreSelect;
