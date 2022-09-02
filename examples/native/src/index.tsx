import React, { useReducer, useRef, useState } from 'react';

import ReactBulk, { useTheme } from '@react-bulk/core';
import {
  Badge,
  Box,
  Button,
  ButtonGroup,
  Card,
  Checkbox,
  Collapse,
  Divider,
  Dropdown,
  Form,
  Grid,
  Icon,
  Image,
  Input,
  Modal,
  Scrollable,
  Select,
  Table,
  Text,
  Tooltip,
} from '@react-bulk/native';

function Main() {
  const theme = useTheme();

  const formRef = useRef(null);

  const [modal, setModal] = useState({});
  const [select, setSelect] = useState(null);
  const [loading, toggleLoading] = useReducer((state) => !state, true);
  const [collpase, toggleCollapse] = useReducer((state) => !state, false);
  const [dropdown, toggleDropdown] = useReducer((state) => !state, false);
  const [checkbox, toggleCheckbox] = useReducer((state) => !state, true);
  const [radio, setRadio] = useState('medium');

  const formData = {
    firstName: 'Richard',
    lastName: 'William',
  };

  const table = [
    { dessert: 'Frozen yogurt', calories: '159', fat: '6.0', carbs: '24' },
    { dessert: 'Ice cream sandwich', calories: '237', fat: '9.0', carbs: '37' },
    { dessert: 'Eclair', calories: '262', fat: '16.0', carbs: '24' },
  ];

  const colors = ['primary', 'secondary', 'info', 'success', 'warning', 'error'];
  const variants = ['solid', 'outline', 'text'];
  const sizes = ['medium', 'small', 'large'];
  const tooltips = ['top', 'bottom', 'left', 'right'];

  const getLabel = (str) => `${str.charAt(0).toUpperCase()}${str.substring(1)}`;

  const handleChangeSize = (e) => {
    const fontSize = Math.min(32, Math.max(12, e.target.value));
    theme.setTheme({ typography: { fontSize } });
  };

  const handleSubmitForm = (e, data) => {
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <Scrollable bg="background.secondary">
      <Box p={3}>
        <Card>
          <Text variant="title">React Bulk</Text>
          <Box flexbox wrap alignItems="center" justifyContent="space-between">
            <Text m={3} ml={0}>
              Open up App.tsx to start working on your app!
            </Text>
            <Box w={80}>
              {/*<Input label="Adjust Size" value={`${theme.typography.fontSize}`} endIcon={<Text>px</Text>} onChange={handleChangeSize}/>*/}
            </Box>
            <Button onPress={() => theme.setTheme({ mode: theme.mode === 'dark' ? 'light' : 'dark' })}>Change Theme</Button>
          </Box>
        </Card>

        <Card mt={3}>
          <Text variant="title" mb={3}>
            Grid
          </Text>
          <Text variant="subtitle" mb={3}>
            size={5}
          </Text>
          <Grid size={5}>
            <Box xs={5} md={1}>
              <Text>
                Column 1 xs={5} md={1}
              </Text>
            </Box>
            <Box xs={5} md={3}>
              <Text>
                Column 2 xs={5} md={3}
              </Text>
            </Box>
            <Box xs={5} md="flex">
              <Text>Column 3 xs={5} md="flex"</Text>
            </Box>
          </Grid>
        </Card>

        <Card mt={3}>
          <Text variant="title" mb={3}>
            Typography
          </Text>
          <Box flexbox alignItems="baseline">
            <Text mr={3} mt={3} variant="h1">
              H1
            </Text>
            <Text mr={3} mt={3} variant="h2">
              H2
            </Text>
            <Text mr={3} mt={3} variant="h3">
              H3
            </Text>
            <Text mr={3} mt={3} variant="h4">
              H4
            </Text>
            <Text mr={3} mt={3} variant="h5">
              H5
            </Text>
            <Text mr={3} mt={3} variant="h6">
              H6
            </Text>
            <Text mr={3} mt={3} variant="title">
              Title
            </Text>
            <Text mr={3} mt={3} variant="subtitle">
              Subtitle
            </Text>
            <Text mr={3} mt={3} variant="caption">
              Caption
            </Text>
            <Text mr={3} mt={3}>
              Text
            </Text>
          </Box>
        </Card>

        <Card mt={3}>
          <Text variant="title">Buttons</Text>
          {variants.map((variant) => (
            <Box key={variant}>
              <Text variant="subtitle" transform="capitalize" mt={3}>
                {variant}
              </Text>
              <Box flexbox wrap direction="row" alignItems="center">
                <Button variant={variant} mr={3} mt={3}>
                  Button
                </Button>
                <Button variant={variant} mr={3} mt={3} disabled>
                  Disabled
                </Button>
                <Button variant={variant} mr={3} mt={3} loading={loading} onPress={toggleLoading}>
                  Loading
                </Button>
                <Button variant={variant} mr={3} mt={3} startIcon="House" />
                <Button variant={variant} mr={3} mt={3} startIcon="House">
                  Start Icon
                </Button>
                <Button variant={variant} mr={3} mt={3} endIcon="House">
                  End Icon
                </Button>
                {sizes.map((size) => (
                  <Button key={size} variant={variant} size={size} mr={3} mt={3}>
                    {getLabel(size)}
                  </Button>
                ))}
              </Box>
              <Button mt={3} variant={variant} block>
                Block
              </Button>
              <Divider mx={-3} my={3} />
            </Box>
          ))}
          <Text mt={3} variant="subtitle">
            Group
          </Text>
          <ButtonGroup mt={3} p={1}>
            <Button>Button</Button>
            <Button disabled>Disabled</Button>
            <Button loading={loading} onPress={toggleLoading}>
              Loading
            </Button>
            <Button startIcon="House" />
            <Button startIcon="House">Start Icon</Button>
            <Button endIcon="House">End Icon</Button>
          </ButtonGroup>
        </Card>

        <Card mt={3}>
          <Text variant="title">Forms</Text>
          <Text mt={3} variant="subtitle">
            Text Field
          </Text>

          <Input mt={3} label="Default Input" placeholder="This is the default input" />
          <Input mt={3} label="Secure" placeholder="Secure input" secure />
          <Input mt={3} label="Read Only" placeholder="Read only input" readOnly />
          <Input mt={3} label="Disabled" placeholder="Disabled input" disabled />
          <Input mt={3} label="Invalid" placeholder="Input with error" error="Value is invalid!" />
          <Input mt={3} label="Icons" placeholder="Input with icons" startIcon="CurrencyDollar" endIcon="CreditCard" />

          {sizes.map((size) => (
            <Input key={size} mt={3} size={size} label={getLabel(size)} placeholder={`This is a ${size} input`} />
          ))}

          <Input mt={3} label="Multiline" placeholder="Multiline input" multiline />

          <Divider mt={3} mx={-3} />

          <Text mt={3} variant="subtitle">
            Combobox
          </Text>

          <Select
            mt={3}
            label="City"
            placeholder="[Select]"
            value={select}
            onChange={(e, val) => setSelect(val)}
            options={[
              { label: 'Option 1', value: '1' },
              { label: 'Option 2', value: '2' },
              { label: 'Option 3', value: '3' },
            ]}
          />

          <Select
            mt={3}
            label="Payment"
            placeholder="[Select]"
            startIcon="CreditCard"
            defaultValue="2"
            options={[
              { label: 'Money', value: '1' },
              { label: 'Credit Card', value: '2' },
              { label: 'Free', value: '3' },
            ]}
          />

          <Divider mt={3} mx={-3} />

          <Text variant="subtitle" mt={3}>
            Checkbox / Radio Button
          </Text>
          <Box flexbox alignItems="center">
            {sizes.map((size) => (
              <Checkbox key={size} mt={3} mr={3} size={size} label={getLabel(size)} checked={checkbox} onChange={toggleCheckbox} />
            ))}
          </Box>
          <Box flexbox alignItems="center">
            {sizes.map((size) => (
              <Checkbox
                key={size}
                mt={3}
                mr={3}
                size={size}
                label={getLabel(size)}
                unique
                checked={radio === size}
                onChange={() => setRadio(size)}
              />
            ))}
          </Box>

          <Divider mt={3} mx={-3} />

          <Text variant="subtitle" mt={3}>
            Serializable
          </Text>
          <Form ref={formRef} onSubmit={handleSubmitForm} data={formData} mt={3}>
            <Grid size={6} gap={3}>
              <Box xs={6} md={4}>
                <Input name="firstName" label="First Name" />
              </Box>
              <Box xs={6} md={4}>
                <Input name="lastName" label="Last Name" />
              </Box>
              <Box xs={6} md={4}>
                <Select
                  name="size"
                  label="Size"
                  defaultValue="small"
                  options={[
                    { value: 'small', label: 'Small' },
                    { value: 'medium', label: 'Medium' },
                    { value: 'large', label: 'Large' },
                  ]}
                />
              </Box>
              <Box xs={6} md={4} ml={-2}>
                <Checkbox name="acceptTerms" label="I accept the terms of use." />
              </Box>
              <Box xs={6} md={4}>
                <Button type="submit" block>
                  Submit
                </Button>
              </Box>
            </Grid>
          </Form>
        </Card>

        <Card mt={3}>
          <Text variant="title">Badge</Text>
          <Box flexbox alignItems="center">
            <Badge mt={3} mr={3} dot />
            <Badge mt={3} mr={3} color="warning">
              2
            </Badge>
            <Badge mt={3} mr={3} color="primary">
              30
            </Badge>
            <Badge mt={3} mr={3} color="success">
              99+
            </Badge>
            <Badge mt={3} mr={3}>
              Large Badge
            </Badge>
            <Button mt={3} mr={3} badge={1}>
              Notifications
            </Button>
          </Box>
        </Card>

        <Card mt={3}>
          <Text variant="title" mb={3}>
            Breakpoints
          </Text>
          <Box flexbox wrap>
            <Button variant="outline" mr={2} style={{ display: 'none', xs: { display: 'flex' } }}>
              Visible on XS
            </Button>
            <Button variant="outline" mr={2} style={{ display: 'none', sm: { display: 'flex' } }}>
              Visible on SM
            </Button>
            <Button variant="outline" mr={2} style={{ display: 'none', md: { display: 'flex' } }}>
              Visible on MD
            </Button>
            <Button variant="outline" mr={2} style={{ display: 'none', lg: { display: 'flex' } }}>
              Visible on LG
            </Button>
            <Button variant="outline" mr={2} style={{ display: 'none', xl: { display: 'flex' } }}>
              Visible on XL
            </Button>
            <Button variant="outline" mr={2} style={{ display: 'none', xxl: { display: 'flex' } }}>
              Visible on XXL
            </Button>
          </Box>
        </Card>

        <Card mt={3}>
          <Text variant="title" mb={3}>
            Tables
          </Text>
          <Table
            border
            rows={table}
            columns={[
              {
                header: 'Dessert',
                content: ({ dessert }) => dessert,
              },
              {
                header: 'Calories',
                content: ({ calories }) => calories,
              },
              {
                header: 'Fat (g)',
                content: ({ fat }) => fat,
              },
              {
                header: 'Carbs (g)',
                content: ({ carbs }) => carbs,
              },
            ]}
          />
        </Card>

        <Card mt={3}>
          <Text variant="title" mb={3}>
            Images
          </Text>
          <Box flexbox center>
            <Image mr={2} w={120} source="https://lirp.cdn-website.com/dbd26f15/dms3rep/multi/opt/fdd-640w.jpg" />
            <Image mr={2} w="15%" source="https://lirp.cdn-website.com/dbd26f15/dms3rep/multi/opt/fdd-640w.jpg" />
            <Image mr={2} h={80} corners={3} source="https://lirp.cdn-website.com/dbd26f15/dms3rep/multi/opt/fdd-640w.jpg" />
            <Image mr={2} w={80} h={80} rounded source="https://lirp.cdn-website.com/dbd26f15/dms3rep/multi/opt/fdd-640w.jpg" />
          </Box>
        </Card>

        <Card mt={3}>
          <Text variant="title" mb={3}>
            Dividers
          </Text>
          <Box flexbox center>
            <Box flex>
              <Text>Horizontal</Text>
              <Divider mt={3} />
              <Divider mt={3} color="primary" />
              <Divider mt={3} color="secondary" />
            </Box>
            <Box flexbox center w="50%" h={100}>
              <Text my={3}>Vertical</Text>
              <Divider ml={3} vertical />
              <Divider ml={3} color="primary" vertical />
              <Divider ml={3} color="secondary" vertical />
            </Box>
          </Box>
        </Card>

        <Card mt={3}>
          <Text variant="title" mb={3}>
            Icons
          </Text>
          <Box />
          <Text>
            <Icon name="HouseLine" /> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aliquam, <Icon name="house_line" />{' '}
            Animi architecto <Icon name="house line" />.
          </Text>
        </Card>

        <Card mt={3}>
          <Text variant="title" mb={3}>
            Modals
          </Text>
          <Box flexbox>
            <Button mr={2} onPress={() => setModal({ visible: true, align: 'center' })}>
              Center
            </Button>
            <Button mr={2} onPress={() => setModal({ visible: true, align: 'top' })}>
              Top
            </Button>
            <Button mr={2} onPress={() => setModal({ visible: true, align: 'bottom' })}>
              Bottom
            </Button>
          </Box>
          <Modal {...modal} onBackdropPress={() => setModal((current) => ({ ...current, visible: false }))}>
            <Card m={3} maxw={300}>
              <Text bold size={1.25}>
                My Modal
              </Text>
              <Text mt={1}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam consectetur cupiditate deserunt dolorum eius et expedita
                qui repellendus voluptatibus! Accusamus consectetur deleniti fuga iure laborum quam quisquam quo ut, velit!
              </Text>
              <Button mt={3} block onPress={() => setModal((current) => ({ ...current, visible: false }))}>
                Close
              </Button>
            </Card>
          </Modal>
        </Card>

        <Card mt={3}>
          <Text variant="title" mb={3}>
            Dropdown
          </Text>
          <Box>
            <Button onPress={toggleDropdown}>Toggle Dropdown</Button>
            <Dropdown visible={dropdown}>Lorem ipsum dolor sit amet</Dropdown>
          </Box>
        </Card>

        <Card mt={3}>
          <Text variant="title" mb={3}>
            Collapse
          </Text>
          <Box>
            <Button onPress={toggleCollapse}>Toggle Collapse</Button>
          </Box>
          <Collapse in={collpase} mt={3}>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque autem consectetur consequuntur corporis, dignissimos
              distinctio earum error ex facere hic ipsum nam necessitatibus neque pariatur quasi quibusdam recusandae suscipit, tempora.
            </Text>
          </Collapse>
        </Card>

        <Card mt={3}>
          <Text variant="title" mb={3}>
            Tooltip
          </Text>
          <Text variant="subtitle" mb={3}>
            Hover/press texts below
          </Text>
          <Box flexbox center>
            {tooltips.map((pos) => (
              <Box key={pos} p={3}>
                <Tooltip title="My tooltip" position={pos}>
                  <Text>{getLabel(pos)}</Text>
                </Tooltip>
              </Box>
            ))}
            {colors.map((color) => (
              <Box key={color} p={3}>
                <Tooltip title="My tooltip" color={color}>
                  <Text>{getLabel(color)}</Text>
                </Tooltip>
              </Box>
            ))}
          </Box>
        </Card>
      </Box>
    </Scrollable>
  );
}

function App() {
  return (
    <ReactBulk theme={{ typography: { fontSize: 16 } }}>
      <Main />
    </ReactBulk>
  );
}

export default App;
