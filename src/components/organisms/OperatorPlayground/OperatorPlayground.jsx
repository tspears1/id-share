import { useMemo, useState } from 'react';

const operators = [
  {
    slug: 'equal',
    label: 'Equal',
    value: '==',
    fn: (a, b) => a == b
  },
  {
    slug: 'strict-equal',
    label: 'Strict Equal',
    value: '===',
    fn: (a, b) => a === b
  },
  {
    slug: 'not-equal',
    label: 'Not Equal',
    value: '!=',
    fn: (a, b) => a != b
  },
  {
    slug: 'logical-and',
    label: 'Logical AND',
    value: '&&',
    fn: (a, b) => a && b
  },
  {
    slug: 'logical-or',
    label: 'Logical OR',
    value: '||',
    fn: (a, b) => a || b
  },
  {
    slug: 'not',
    label: 'Logical NOT',
    value: '!',
    fn: (a) => !a
  },
  {
    slug: 'nullish-coalesce',
    label: 'Nullish Coalesce',
    value: '??',
    fn: (a, b) => a ?? b
  },
  {
    slug: 'nullish-assignment',
    label: 'Nullish Assignment',
    value: '??=',
    fn: (a, b) => a ??= b
  }
];

const OperatorPlayground = () => {
  const [operator, setOperator] = useState(operators[0]);
  const [value1, setValue1] = useState(true);
  const [value2, setValue2] = useState(false);

  const handleOperatorChange = (e) => {
    setOperator(e.target.value);
  };

  const handleValue1Change = (e) => {
    setValue1(convertValue(e.target.value));
  };

  const handleValue2Change = (e) => {
    setValue2(convertValue(e.target.value));
  };

  const convertValue = (value) => {
    // check if value starts with a single or double quote
    if (typeof value === 'string' && (value?.startsWith('"') || value?.startsWith("'"))) {
      return value;
    }
    if (value == 'true' || value == 'false') {
      return Boolean(value);
    }
    if (value == 'null') {
      return null;
    }
    if (value == 'undefined') {
      return undefined;
    }
    if (value == 'NaN') {
      return NaN;
    }
    if (value == 'Infinity') {
      return Infinity;
    }
    if (Array.isArray(value)) {
      return Array.from(value);
    }
    if (!Number.isNaN(Number(value))) {

      return Number(value);
    }
    return value;
  }

  const outputValue = useMemo(() => {
    const op = operator;
    const v1 = value1;
    const v2 = value2;
    console.log(op, typeof op, v1, v2);
    try {
      op.fn(v1, v2);
    } catch (error) {
      console.error(error);
      return '---';
    }

    return op.fn(v1, v2);

  }, [operator, value1, value2]);

  return (
    <div>
      <fieldset>
        <legend>Operators Playground</legend>
        <div className="operator-playground__equation">
          <div className="operator-playground__equation__left">
            <div className="value-input">
              <input
                type="text"
                value={value1}
                onInput={handleValue1Change}
              />
              <span>{typeof value1}</span>
            </div>
            <div className="select">
              <select
                value={operator.slug}
                onChange={handleOperatorChange}
              >
                {operators.map(({ slug, label, value }) => (
                  <option key={slug} value={slug}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
            <div className="value-input">
              <input
                type="text"
                value={value2}
                onInput={handleValue2Change}
              />
              <span>{typeof value2}</span>
            </div>
          </div>
          <div className="operator-playground__equation__right">
            <input
              type="text"
              value={outputValue}
              readOnly
            />
          </div>
        </div>
      </fieldset>
    </div>
  );
};

export default OperatorPlayground