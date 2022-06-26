const { Client } = require("@notionhq/client");
const page = require("../models/page");

module.exports = async (req, res) => {
  const notion_url = req.query.notion_link;
  const notion = new Client({
    auth: "secret_c6gzD59l5jxzscmMFhXVhi83e4KcDKOmr454lXCdRSH",
  });
  const page_id = notion_url.slice(notion_url.lastIndexOf("-") + 1);
  const page_block = await notion.blocks.retrieve({ block_id: page_id });
  // nodejs가 기본적으로 비동기를 지원하는데, 실행의 순서가 중요한 경우 await를 붙여서 동기화를 시켜야 한다.
  // await를 통해 해당 작업이 완료되기를 기다리도록 할 수 있다.

  var stack = []; // dfs를 위해 stack 구현
  var current_block; // stack pop 했을 때 가져오는 것
  var children_blocks; //인접한 node 담기
  stack.push(page_block); // root 페이지를 넣은 셈

  var title = page_block.child_page.title; //root 페이지의 title 출력
  var content = []; //page의 내용을 담을 content 변수 선언

  while (stack) {
    //stack이 빌 때 까지, 이하 내용은 dfs와 동일
    current_block = stack.pop(); //pop해서
    if (current_block === undefined) break;

    content = content.concat(get_block_text(current_block)); //방문하고
    content.push({text: '', style: {
        bold: false,
        italic: false,
        strikethrough: false,
        underline: false,
        code: false,
        color: 'default'
    }})

    if (current_block.has_children) {
      //애가 있으면
      children_blocks = await notion.blocks.children.list({
        block_id: current_block.id,
      });
      for (var block of children_blocks.results.reverse()) {
        //reverse를 하는 이유: stack에 넣으면서 문서의 순서가 뒤집히기 때문에, 뒤집어서 넣어줘야 함.
        stack.push(block); //다 넣어준다
      }
    }
  }

  page.create(
    {
      owner: req.session.user_id,
      title: title,
      contents: content,
      link: notion_url,
      category: "analysis",
    },
    (error, page_text) => {
      console.log(error);
      res.redirect("/analysis");
    }
  );

  /*todo
        1. 해당 문서에서 필요한 정보를 어떤 형태로 저장할 것인지 결정하기.
            ex) 이미지 url
                bold된 문자열
        2. 해당 형태 그대로 어떻게 DB에 저장할 것인지 결정하기.
    */
};

const get_block_text = (block) => {
  var rich_text = [];
  var text_style = [];
  try {
    if (block.type === "paragraph") {
      rich_text = block.paragraph.rich_text;
    } else if (block.type === "bulleted_list_item") {
      rich_text = block.bulleted_list_item.rich_text;
    } else if (block.type === "numbered_list_item") {
      rich_text = block.numbered_list_item.rich_text;
    } else if (block.type === "toggle") {
      rich_text = block.toggle.rich_text;
    } else if (block.type === "image") rich_text = ["[image]"];
    else rich_text = ["-"];
    rich_text.map((rt_data) => {
      if (rt_data.plain_text !== undefined) text_style.push({text:rt_data.plain_text,style:rt_data.annotations})
    });
    return text_style;
  } catch (e) {
    console.log(e);
    return "[cannot read this block]";
  }
};