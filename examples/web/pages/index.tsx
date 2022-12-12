import React, { useReducer, useRef, useState } from 'react';

import { AnyObject, FormRef, RbkEvent, RbkTheme, useTheme } from '@react-bulk/core';
import {
  Animation,
  Badge,
  Box,
  Button,
  ButtonGroup,
  Card,
  Carousel,
  Checkbox,
  Collapse,
  Divider,
  Dropdown,
  Form,
  Grid,
  Image,
  Input,
  ListItem,
  Modal,
  Progress,
  Scrollable,
  Select,
  Slider,
  Table,
  Text,
  Tooltip,
} from '@react-bulk/web';

const colors = ['primary', 'secondary', 'info', 'success', 'warning', 'error'];
const variants = ['solid', 'outline', 'text'];
const sizes = ['xsmall', 'small', 'medium', 'large', 'xlarge'];
const tooltips = ['top', 'bottom', 'left', 'right'];
const animations = ['Spin', 'FadeIn', 'FadeOut', 'ZoomIn', 'ZoomOut'];
const breakpoints = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];

const formData = {
  firstName: 'Richard',
  lastName: 'William',
};

const table = [
  { dessert: 'Frozen yogurt', calories: '159', fat: '6.0', carbs: '24' },
  { dessert: 'Ice cream sandwich', calories: '237', fat: '9.0', carbs: '37' },
  { dessert: 'Eclair', calories: '262', fat: '16.0', carbs: '24' },
];

const getLabel = (str: string) => `${str.charAt(0).toUpperCase()}${str.substring(1)}`;

export default function Main() {
  const theme: RbkTheme = useTheme();

  const timeoutRef = useRef<any>({});

  const [radio, setRadio] = useState('medium');
  const [modal, setModal] = useState({});

  const [loading, toggleLoading] = useReducer((state) => !state, true);
  const [checkbox, toggleCheckbox] = useReducer((state) => !state, true);
  const [dropdown, toggleDropdown] = useReducer((state) => !state, false);
  const [collpase, toggleCollapse] = useReducer((state) => !state, false);

  const handleSubmitForm = (e: FormRef, data: AnyObject) => {
    alert(JSON.stringify(data, null, 2));
  };

  const handleChangeTheme = (e: RbkEvent) => {
    const prop = e.target.name;
    const split = prop.split('.');
    const last = split.pop();

    let value = e.target.value;

    if (prop === 'typography.fontSize') {
      value = Math.min(32, Math.max(8, e.target.value));
    }

    const data = {};
    let ref: AnyObject = data;

    for (let attr of split) {
      ref[attr] = {};
      ref = ref[attr];
    }

    ref[last] = value;

    if (timeoutRef.current[prop]) {
      clearTimeout(timeoutRef.current[prop]);
    }

    timeoutRef.current[prop] = setTimeout(() => {
      theme.setTheme(data);
    }, 500);
  };

  return (
    <Scrollable bg="background.secondary" contentInset={3}>
      <Card>
        <Text variant="title">React Bulk</Text>
        <Text mt={3}>Open up App.tsx to start working on your app!</Text>
      </Card>

      <Card mt={3}>
        <Text variant="title">Theme</Text>

        <Divider mt={3} mx={-3} />

        <Text variant="subtitle" my={3}>
          Mode
        </Text>

        <ButtonGroup>
          <Button variant={theme.mode === 'light' ? 'solid' : 'outline'} onPress={() => theme.setTheme('light')}>
            Light
          </Button>
          <Button variant={theme.mode === 'dark' ? 'solid' : 'outline'} onPress={() => theme.setTheme('dark')}>
            Dark
          </Button>
        </ButtonGroup>

        <Divider mt={3} mx={-3} />

        <Text variant="subtitle" my={3}>
          Shape
        </Text>
        <Grid gap={3}>
          <Box xs={6} md={3}>
            <Input
              type="number"
              label="Spacing"
              name="shape.spacing"
              endAddon="px"
              value={`${theme.shape.spacing}`}
              onChange={handleChangeTheme}
            />
          </Box>
          <Box xs={6} md={3}>
            <Input
              type="number"
              label="Border Radius"
              name="shape.borderRadius"
              endAddon="px"
              value={`${theme.shape.borderRadius}`}
              onChange={handleChangeTheme}
            />
          </Box>
        </Grid>

        <Divider mt={3} mx={-3} />

        <Text variant="subtitle" my={3}>
          Typography
        </Text>
        <Grid gap={3}>
          <Box xs={6} md={3}>
            <Input
              type="number"
              label="Font Size"
              name="typography.fontSize"
              endAddon="px"
              value={`${theme.typography.fontSize}`}
              onChange={handleChangeTheme}
            />
          </Box>
          <Box xs={6} md={3}>
            <Input
              type="number"
              label="Line Height"
              name="typography.lineHeight"
              endAddon="float"
              value={`${theme.typography.lineHeight}`}
              onChange={handleChangeTheme}
            />
          </Box>
        </Grid>

        <Divider mt={3} mx={-3} />

        <Text variant="subtitle" my={3}>
          Colors
        </Text>
        <Grid gap={3}>
          {Object.keys(theme.colors)
            .filter((item) => !['common', 'text', 'background'].includes(item))
            .map((color) => (
              <Box key={color} xs={12} sm={4} xxl={2}>
                <Input
                  color={color}
                  label={getLabel(color)}
                  labelStyle={{ color }}
                  name="colors.primary.main"
                  value={theme.colors[color]?.main ?? theme.colors[color]?.primary}
                  onChange={handleChangeTheme}
                />
              </Box>
            ))}
        </Grid>
      </Card>

      <Card mt={3}>
        <Text variant="title" mb={3}>
          Grid
        </Text>
        <Text variant="subtitle" mb={3}>
          size={5}
        </Text>
        <Grid size={5}>
          <Text xs={5} md={1}>
            Column 1 xs={5} md={1}
          </Text>
          <Text xs={5} md={3}>
            Column 2 xs={5} md={3}
          </Text>
          <Text xs={5} md="auto">
            Column 3 xs={5} md="flex"
          </Text>
        </Grid>
      </Card>

      <Card mt={3}>
        <Text variant="title">Typography</Text>
        <Grid alignItems="baseline" gap={3} mt={3}>
          <Text variant="h1">H1</Text>
          <Text variant="h2">H2</Text>
          <Text variant="h3">H3</Text>
          <Text variant="h4">H4</Text>
          <Text variant="h5">H5</Text>
          <Text variant="h6">H6</Text>
          <Text variant="title">Title</Text>
          <Text variant="subtitle">Subtitle</Text>
          <Text variant="caption">Caption</Text>
          <Text>Text</Text>
        </Grid>
      </Card>

      <ListItem startAddon="❤" endAddon="⚙" chevron mt={3}>
        <Box>
          <Text bold>List Item</Text>
          <Text>Lorem ipsum dolor sit amet</Text>
        </Box>
      </ListItem>

      <Card mt={3}>
        <Text variant="title">Buttons</Text>
        {variants.map((variant) => (
          <Box key={variant}>
            <Text variant="subtitle" transform="capitalize" mt={3}>
              {variant}
            </Text>
            <Grid alignItems="center" gap={3} mt={3}>
              <Box>
                <Button variant={variant}>Button</Button>
              </Box>
              <Box>
                <Button variant={variant} disabled>
                  Disabled
                </Button>
              </Box>
              <Box>
                <Button variant={variant} loading={loading} onPress={toggleLoading}>
                  Loading
                </Button>
              </Box>
              <Box>
                <Button variant={variant} circular>
                  Circular
                </Button>
              </Box>
              <Box>
                <Button variant={variant} startAddon="⚙" circular />
              </Box>
              <Box>
                <Button variant={variant} startAddon="⚙">
                  Start Icon
                </Button>
              </Box>
              <Box>
                <Button variant={variant} endAddon="⚙">
                  End Icon
                </Button>
              </Box>
              <Box>
                <Button variant={variant} transform="uppercase">
                  Transformed
                </Button>
              </Box>
              <Box xs={12} />
              {sizes.map((size) => (
                <Box key={size}>
                  <Button variant={variant} size={size}>
                    {getLabel(size)}
                  </Button>
                </Box>
              ))}
            </Grid>
            <Divider mx={-3} my={3} />
          </Box>
        ))}
        <Text mt={3} variant="subtitle">
          Group
        </Text>
        <ButtonGroup mt={3} p={1} variant="outline">
          <Button>Button</Button>
          <Button disabled>Disabled</Button>
          <Button loading={loading} onPress={toggleLoading}>
            Loading
          </Button>
          <Button startAddon="⚙" circular />
          <Button startAddon="⚙">Start Icon</Button>
          <Button endAddon="⚙">End Icon</Button>
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
        <Input mt={3} label="Icons" placeholder="Input with icons" startAddon="$" endAddon="💳" />

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
          options={[
            { label: 'Option 1', value: 1 },
            { label: 'Option 2', value: 2 },
            { label: 'Option 3', value: 3 },
          ]}
        />

        <Select
          mt={3}
          label="Payment"
          placeholder="[Select]"
          startAddon="💳"
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

        <Grid alignItems="center" gap={3}>
          {sizes.map((size) => (
            <Box key={size}>
              <Checkbox size={size} label={getLabel(size)} checked={checkbox} onChange={toggleCheckbox} />
            </Box>
          ))}
        </Grid>

        <Grid alignItems="center" gap={3}>
          {sizes.map((size) => (
            <Box key={size}>
              <Checkbox key={size} size={size} label={getLabel(size)} unique checked={radio === size} onChange={() => setRadio(size)} />
            </Box>
          ))}
        </Grid>

        <Divider mt={3} mx={-3} />

        <Text variant="subtitle" mt={3}>
          Slider
        </Text>
        <Box p={3}>
          {sizes.map((size) => (
            <Slider key={size} size={size} defaultValue={Math.random() * 100} mt={3} />
          ))}
        </Box>

        <Divider mt={3} mx={-3} />

        <Text variant="subtitle" mt={3}>
          Serializable
        </Text>
        <Form onSubmit={handleSubmitForm} data={formData} mt={3}>
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
            <Box xs={6} md={4}>
              <Text>Rating</Text>
              <Slider name="rating" min={1} max={5} />
            </Box>
            <Box xs={6} md={4}>
              <Checkbox name="acceptTerms" label="I accept the terms of use." />
            </Box>
            <Box xs={6} md={4}>
              <Button type="submit">Submit</Button>
            </Box>
          </Grid>
        </Form>
      </Card>

      <Card mt={3}>
        <Text variant="title">Badge</Text>
        <Grid alignItems="center" gap={3} mt={3}>
          <Box>
            <Badge dot />
          </Box>
          <Box>
            <Badge color="warning">2</Badge>
          </Box>
          <Box>
            <Badge color="primary">30</Badge>
          </Box>
          <Box>
            <Badge color="success">99+</Badge>
          </Box>
          <Box>
            <Badge>Large Badge</Badge>
          </Box>
          <Box>
            <Button badge={1}>Notifications</Button>
          </Box>
        </Grid>
      </Card>

      <Card mt={3}>
        <Text variant="title">Breakpoints</Text>
        <Grid gap={3} mt={3}>
          {breakpoints.map((bkp, index) => {
            const bg = theme.hex2rgba('primary', (index + 1) / breakpoints.length);
            const color = theme.contrast(bg);

            return (
              <Box key={bkp}>
                <Card bg={bg} style={{ display: 'none', [bkp]: { display: 'flex' } }}>
                  <Text color={color}>Visible on {bkp.toUpperCase()}+</Text>
                </Card>
              </Box>
            );
          })}
        </Grid>
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
        <Box row center>
          <Image mr={2} w={120} source="https://lirp.cdn-website.com/dbd26f15/dms3rep/multi/opt/fdd-640w.jpg" />
          <Image mr={2} w="15%" source="https://lirp.cdn-website.com/dbd26f15/dms3rep/multi/opt/fdd-640w.jpg" />
          <Image mr={2} h={80} corners={3} source="https://lirp.cdn-website.com/dbd26f15/dms3rep/multi/opt/fdd-640w.jpg" />
          <Image mr={2} w={80} h={80} circular source="https://lirp.cdn-website.com/dbd26f15/dms3rep/multi/opt/fdd-640w.jpg" />
        </Box>
      </Card>

      <Card mt={3}>
        <Text variant="title" mb={3}>
          Dividers
        </Text>
        <Box row center>
          <Box flex>
            <Text>Horizontal</Text>
            <Divider mt={3} />
            <Divider mt={3} color="primary" />
            <Divider mt={3} color="secondary" />
          </Box>
          <Box row center w="50%" h={100}>
            <Text my={3}>Vertical</Text>
            <Divider ml={3} vertical />
            <Divider ml={3} color="primary" vertical />
            <Divider ml={3} color="secondary" vertical />
          </Box>
        </Box>
      </Card>

      <Card mt={3}>
        <Text variant="title">Modals</Text>
        <Grid gap={3} mt={3}>
          <Box>
            <Button onPress={() => setModal({ visible: true, valign: 'top' })}>Top</Button>
          </Box>
          <Box>
            <Button onPress={() => setModal({ visible: true, valign: 'bottom' })}>Bottom</Button>
          </Box>
          <Box>
            <Button onPress={() => setModal({ visible: true, valign: 'center' })}>Center</Button>
          </Box>
          <Box>
            <Button onPress={() => setModal({ visible: true, halign: 'left' })}>Left</Button>
          </Box>
          <Box>
            <Button onPress={() => setModal({ visible: true, halign: 'right' })}>Right</Button>
          </Box>
        </Grid>
        <Modal {...modal} onBackdropPress={() => setModal((current) => ({ ...current, visible: false }))}>
          <Box maxw={300}>
            <Text bold size={1.25}>
              My Modal
            </Text>
            <Divider my={3} mx={-3} />
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam consectetur cupiditate deserunt dolorum eius et expedita qui
              repellendus voluptatibus! Accusamus consectetur deleniti fuga iure laborum quam quisquam quo ut, velit!
            </Text>
            <Button mt={3} onPress={() => setModal((current) => ({ ...current, visible: false }))}>
              Close
            </Button>
          </Box>
        </Modal>
      </Card>

      <Card mt={3}>
        <Text variant="title" mb={3}>
          Dropdown
        </Text>
        <Box row>
          <Button onPress={toggleDropdown}>Toggle Dropdown</Button>
        </Box>
        <Dropdown visible={dropdown}>
          <Text>Lorem ipsum dolor sit amet</Text>
        </Dropdown>
      </Card>

      <Card mt={3}>
        <Text variant="title" mb={3}>
          Collapse
        </Text>
        <Box row>
          <Button onPress={toggleCollapse}>Toggle Collapse</Button>
        </Box>
        <Collapse in={collpase} mt={3}>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque autem consectetur consequuntur corporis, dignissimos distinctio
            earum error ex facere hic ipsum nam necessitatibus neque pariatur quasi quibusdam recusandae suscipit, tempora.
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
        <Box row center>
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

      <Card mt={3}>
        <Text variant="title" mb={3}>
          Animations
        </Text>
        {animations.map((animation, key) => {
          // @ts-ignore
          const Component = Animation[animation];

          return (
            <React.Fragment key={key}>
              <Box key={key}>
                <Text variant="subtitle" mb={3}>
                  {animation}
                </Text>
                <Grid noWrap alignItems="center" gap={6}>
                  <Component loop in>
                    <Progress />
                  </Component>
                  <Component loop in>
                    <Image w={40} source="https://lirp.cdn-website.com/dbd26f15/dms3rep/multi/opt/fdd-640w.jpg" />
                  </Component>
                  <Component loop in>
                    <Text>Anything</Text>
                  </Component>
                </Grid>
              </Box>
              <Divider my={3} />
            </React.Fragment>
          );
        })}

        <Box>
          <Text variant="subtitle" mb={3}>
            Custom
          </Text>
          <Grid noWrap gap={6} alignItems="center">
            <Box>
              <Animation component={Progress} loop in from={{ top: -10, opacity: 0 }} to={{ top: 0, opacity: 1 }} />
            </Box>
            <Box>
              <Animation loop in from={{ top: -20, opacity: 0 }} to={{ top: 0, opacity: 1 }}>
                <Image w={40} source="https://lirp.cdn-website.com/dbd26f15/dms3rep/multi/opt/fdd-640w.jpg" />
              </Animation>
            </Box>
            <Box>
              <Animation loop in from={{ top: -30, opacity: 0 }} to={{ top: 0, opacity: 1 }}>
                Anything
              </Animation>
            </Box>
          </Grid>
        </Box>
      </Card>

      <Card mt={3}>
        <Text variant="title" mb={3}>
          Carousel
        </Text>
        <Carousel xs={1} sm={2} md={3} lg={4} xl={5} gap={3}>
          {Array.from({ length: 11 }).map((i, index) => (
            <Card key={index} corners={3} bg="background.secondary">
              <Text bold>Item {index + 1}</Text>
              <Image w="100%" corners={3} my={3} source="https://lirp.cdn-website.com/dbd26f15/dms3rep/multi/opt/fdd-640w.jpg" />
              <Text>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos recusandae suscipit velit voluptate.</Text>
            </Card>
          ))}
        </Carousel>
      </Card>
    </Scrollable>
  );
}
