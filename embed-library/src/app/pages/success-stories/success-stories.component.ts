import { Component } from "@angular/core";

@Component({
  selector: "app-success-stories",
  templateUrl: "./success-stories.component.html",
  styleUrls: ["./success-stories.component.scss"],
})
export class SuccessStoriesComponent {
  stories = [
    { name: "rochester", type: "post" },
    { name: "wasau", type: "graph" },
    { name: "advocate", type: "graph" },
    { name: "mission-local", type: "post" },
    { name: "eye", type: "graph" },
  ];

  imgUrl(story, type) {
    return `assets/images/case-study/${story}/${type}.png`;
  }
}
