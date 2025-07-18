import { StyleTextEnum, TextDirective } from './text.directive';
import { ElementRef, Renderer2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DOCUMENT } from '@angular/common';
import { of } from 'rxjs';

describe('TextDirective', () => {
  const setup = (
    element: ElementRef,
    renderer2: Renderer2,
    document: unknown
  ) =>
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ElementRef,
          useValue: element,
        },
        {
          provide: Renderer2,
          useValue: renderer2,
        },
        {
          provide: DOCUMENT,
          useValue: document,
        },
        TextDirective,
      ],
    }).inject(TextDirective);

  it('should create an instance', () => {
    const element: ElementRef = {
      nativeElement: {
        remove: () => {
          console.log('Iancu');
        },
        innerText: { trim: () => null },
      },
    } as ElementRef;
    const renderer2 = {} as Renderer2;
    const docuument = {
      querySelectorAll: () => [
        {
          remove: () => {},
        },
      ],
    };
    const directive = setup(element, renderer2, docuument);

    const content1 = 'content8';
    expect(
      directive.getElementTag(StyleTextEnum.Title_1 as string, content1)
    ).toEqual('h3');
  });
  const testCases = [
    {
      style: StyleTextEnum.Medium_3,
      expectedClasses: ['text-6xl', 'text-gray-900'],
      colorTextMock: 'text-gray-900',
    },
    {
      style: StyleTextEnum.Medium_2,
      expectedClasses: ['text-3xl', 'text-blue-500'],
      colorTextMock: 'text-blue-500',
    },
    {
      style: StyleTextEnum.Medium_1,
      expectedClasses: ['text-2xl', 'text-green-500'],
      colorTextMock: 'text-green-500',
    },
    {
      style: StyleTextEnum.Small_3,
      expectedClasses: ['text-5xl', 'text-red-500'],
      colorTextMock: 'text-red-500',
    },
    {
      style: StyleTextEnum.Small_2,
      expectedClasses: ['text-2xl', 'text-yellow-500'],
      colorTextMock: 'text-yellow-500',
    },
    {
      style: StyleTextEnum.Small_1,
      expectedClasses: ['text-base', 'text-purple-500'],
      colorTextMock: 'text-purple-500',
    },
    {
      style: StyleTextEnum.Title_4,
      elementExpected: 'h1',
      expectedClasses: ['text-7xl', 'text-pink-500', 'font-bold', 'mb-3'],
      colorTextMock: 'text-pink-500',
    },
    {
      style: StyleTextEnum.Title_3_1,
      elementExpected: 'h1',
      expectedClasses: ['text-4xl', 'text-pink-500', 'font-bold', 'mb-3'],
      colorTextMock: 'text-pink-500',
    },
    {
      style: StyleTextEnum.Title_3,
      elementExpected: 'h1',
      expectedClasses: ['text-5xl', 'text-pink-500', 'font-bold', 'mb-3'],
      colorTextMock: 'text-pink-500',
    },
    {
      style: StyleTextEnum.Title_2,
      elementExpected: 'h2',
      expectedClasses: ['text-3xl', 'text-orange-500', 'font-bold', 'mb-2'],
      colorTextMock: 'text-orange-500',
    },
    {
      style: StyleTextEnum.Title_1,
      elementExpected: 'h3',
      expectedClasses: ['text-1xl', 'text-brown-500', 'font-bold', 'mb-1'],
      colorTextMock: 'text-brown-500',
    },
    {
      style: 'UnknownStyle',
      expectedClasses: ['bg-red-500'],
      colorTextMock: '',
    },
  ];

  testCases.forEach(
    ({ style, expectedClasses, colorTextMock, elementExpected }) => {
      const element: ElementRef = {
        nativeElement: {
          remove: () => {
            console.log('Iancu');
          },
          innerText: { trim: () => null },
        },
      } as ElementRef;
      const renderer2 = {
        addClass() {
          // TODO: remove
        },
        setProperty() {
          // TODO: remove
        },
        appendChild: jest.fn().mockReturnValue(of({}) as any),
      } as unknown as Renderer2;
      const docuument = {
        createElement: () => ({
          remove: () => {},
          innerText: '',
        }),
        querySelectorAll: () => [
          {
            remove: () => {},
          },
        ],
        nativeElement: {
          innerText: {
            trim: () => 'fsdf',
          },
        },
      };

      it(`should return the correct classes for style ${style}`, () => {
        const directive = setup(element, renderer2, docuument);
        const content1 = 'content81';

        jest
          .spyOn(directive as any, 'colorText')
          .mockReturnValue(colorTextMock);
        const result = directive.getElementClasses(style);
        expect(result).toEqual(expectedClasses);
        const resultElementExpected = directive.getElementTag(style, content1);

        expect(resultElementExpected).toEqual(elementExpected ?? 'p');
      });
    }
  );
  it(`should called ng on init`, () => {
    const element: ElementRef = {
      nativeElement: {
        remove: () => {
          console.log('Iancu');
        },
        innerText: {
          trim: () => null,
        },
      },
    } as ElementRef;
    const renderer2 = {
      addClass() {
        // TODO: remove
      },
      setStyle() {
        // TODO: remove
      },

      setProperty() {
        // TODO: remove
      },
      appendChild: jest.fn().mockReturnValue(of({}) as any),
    } as unknown as Renderer2;
    const docuument = {
      createElement: () => ({
        remove: () => {},
        innerText: '',
      }),
      querySelectorAll: () => [
        {
          remove: () => {},
        },
      ],
      nativeElement: {
        remove: () => {
          console.log('Iancu');
        },
        innerText: {
          trim: () => 'fsdf',
        },
      },
    };
    jest.spyOn(console as any, 'error').mockReturnValue('sfsf');
    const directive = setup(element, renderer2, docuument);

    expect(console.error).toHaveBeenCalledWith(
      'No content found inside <lib-text>. Please check the content projection.'
    );
  });
});
