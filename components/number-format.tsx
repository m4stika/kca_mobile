import { NumericFormat, NumericFormatProps } from 'react-number-format';
import { TextInput } from 'react-native';
import { Input } from './atoms';

type NumbericProps = NumericFormatProps & { title?: string, handleChange?: (value: string) => void }
export function NumberFormat({ value, title, className, handleChange, ...props }: NumbericProps) {
  return (
    <NumericFormat
      value={value}
      displayType={"text"}
      thousandSeparator={true}
      // onValueChange={format => setNumberValue(format.floatValue || 0)}
      {...props}
      // prefix={'$'}
      renderText={formattedValue =>
        <Input
          title={title}
          underlineColorAndroid="transparent"
          onChangeText={handleChange}
          value={formattedValue}
          keyboardType="numeric"
          className={className}
        />
      } // <--- Don't forget this!
    />
  );
}
