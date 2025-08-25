ALTER TABLE "scheduleAvailabilities" DROP CONSTRAINT "scheduleAvailabilities_id_schedules_id_fk";
--> statement-breakpoint
DROP INDEX "scheduleIdIndex";--> statement-breakpoint
ALTER TABLE "scheduleAvailabilities" ADD PRIMARY KEY ("id");--> statement-breakpoint
ALTER TABLE "scheduleAvailabilities" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "scheduleAvailabilities" ADD COLUMN "scheduleId" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "scheduleAvailabilities" ADD CONSTRAINT "scheduleAvailabilities_scheduleId_schedules_id_fk" FOREIGN KEY ("scheduleId") REFERENCES "public"."schedules"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "scheduleIdIndex" ON "scheduleAvailabilities" USING btree ("scheduleId");