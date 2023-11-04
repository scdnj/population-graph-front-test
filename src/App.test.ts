import { render } from '@testing-library/vue';
import { composeStories } from '@storybook/testing-vue3';
import * as stories from './App.stories';
jest.mock('@/scripts/Api');

const { 選択済み } = composeStories(stories);
describe('App', () => {
  test('snapshot', async () => {
    const html = render(選択済み(), {
      global: {
        stubs: {
          CompositionChart: {
            template: `<span>{{ $attrs }}</span>`,
          },
        },
      },
    });
    await 選択済み.play({ canvasElement: html.container as never });
    expect(html.container).toMatchInlineSnapshot(`
      <div>
        <div>
          <div
            class="flex flex-wrap text-lg font-bold"
          >
            
            <div
              class="w-24"
            >
              <label
                class="flex items-center text-sm space-x-2 p-1"
              >
                <input
                  type="checkbox"
                />
                <div>
                  北海道
                </div>
              </label>
            </div>
            <div
              class="w-24"
            >
              <label
                class="flex items-center text-sm space-x-2 p-1"
              >
                <input
                  type="checkbox"
                />
                <div>
                  青森県
                </div>
              </label>
            </div>
            <div
              class="w-24"
            >
              <label
                class="flex items-center text-sm space-x-2 p-1"
              >
                <input
                  type="checkbox"
                />
                <div>
                  東京都
                </div>
              </label>
            </div>
            <div
              class="w-24"
            >
              <label
                class="flex items-center text-sm space-x-2 p-1"
              >
                <input
                  type="checkbox"
                />
                <div>
                  けつばん
                </div>
              </label>
            </div>
            
          </div>
          <span
            compositions="[object Object],[object Object]"
          >
            {
        "compositions": [
          {
            "prefName": "北海道",
            "composition": [
              {
                "data": [
                  {
                    "value": 50,
                    "year": 1960
                  }
                ],
                "label": "総人口"
              },
              {
                "data": [
                  {
                    "value": 10,
                    "year": 1960
                  }
                ],
                "label": "年少人口"
              },
              {
                "data": [
                  {
                    "value": 20,
                    "year": 1960
                  }
                ],
                "label": "生産年齢人口"
              },
              {
                "data": [
                  {
                    "value": 20,
                    "year": 1960
                  }
                ],
                "label": "老年人口"
              }
            ]
          },
          {
            "prefName": "東京都",
            "composition": [
              {
                "data": [
                  {
                    "value": 150,
                    "year": 1960
                  }
                ],
                "label": "総人口"
              },
              {
                "data": [
                  {
                    "value": 30,
                    "year": 1960
                  }
                ],
                "label": "年少人口"
              },
              {
                "data": [
                  {
                    "value": 60,
                    "year": 1960
                  }
                ],
                "label": "生産年齢人口"
              },
              {
                "data": [
                  {
                    "value": 60,
                    "year": 1960
                  }
                ],
                "label": "老年人口"
              }
            ]
          }
        ]
      }
          </span>
        </div>
      </div>
    `);
  });
});
